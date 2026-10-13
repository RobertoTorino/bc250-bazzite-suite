// SPDX-License-Identifier: AGPL-3.0-only
//! The video receiver: video packets in, whole frames out. A frame is flushed as soon
//! as enough of its units are there, or at its last unit, or when the next frame starts. Frames that never came or
//! could not be rebuilt are reported to the console (CORRUPTFRAME, sent by the stream connection); the units per
//! frame go to the packet counts for the congestion reports.
//!
//! Not here yet: the reference's look into the bitstream (bitstream.c), which swaps a missing reference frame for an
//! older one and, after a failed FEC, can ask for a key frame and skip frames until it comes. That needs the
//! decoder's side and comes with it.

use crate::frame::{FlushResult, FrameProcessor, PacketStats};
use crate::seqnum::{gt16, lt16};
use crate::takion::AvPacket;

#[derive(Debug, PartialEq, Eq)]
pub enum VideoEvent {
    /// The stream switched to this resolution (an index into STREAMINFO's resolutions): its header goes to the
    /// decoder before the next frame.
    Profile(u8),
    /// A whole frame; fec when units came from FEC, frames_lost the frames lost since the last one delivered.
    Frame { index: u16, data: Vec<u8>, fec: bool, frames_lost: i32 },
    /// Frames start to end (inclusive) are missing or broken: the console is told.
    Corrupt { start: u16, end: u16 },
}

#[derive(Clone, Copy, Debug, Default)]
pub struct VideoStats {
    pub frames: u64,
    pub bytes: u64,
    pub fec_recovered: u64,
    pub fec_failed: u64,
    pub frames_lost: i64,
    pub old_packets: u64,
    pub bad_profile: u64,
    pub bad_units: u64,
}

pub struct VideoReceiver {
    profiles: usize,
    profile_cur: Option<u8>,
    frame_index_cur: Option<u16>,           // the frame being filled
    frame_index_prev: Option<u16>,          // the last frame flushed, whole or not
    frame_index_prev_complete: u16,         // the last frame delivered
    processor: FrameProcessor,
    frames_lost: i32,
    pub stats: VideoStats,
}

impl VideoReceiver {
    /// profiles: the number of resolutions in STREAMINFO.
    pub fn new(profiles: usize) -> Self {
        Self {
            profiles,
            profile_cur: None,
            frame_index_cur: None,
            frame_index_prev: None,
            frame_index_prev_complete: 0,
            processor: FrameProcessor::new(),
            frames_lost: 0,
            stats: VideoStats::default(),
        }
    }

    pub fn packet(&mut self, packet: &AvPacket, data: &[u8], packet_stats: &mut PacketStats) -> Vec<VideoEvent> {
        let mut events = Vec::new();
        let frame_index = packet.frame_index;
        if self.frame_index_cur.is_some_and(|cur| lt16(frame_index, cur)) {
            self.stats.old_packets += 1;
            return events;
        }

        if self.profile_cur != Some(packet.adaptive_stream_index) {
            if packet.adaptive_stream_index as usize >= self.profiles {
                self.stats.bad_profile += 1;
                return events;
            }
            self.profile_cur = Some(packet.adaptive_stream_index);
            events.push(VideoEvent::Profile(packet.adaptive_stream_index));
        }

        if self.frame_index_cur.is_none_or(|cur| gt16(frame_index, cur)) {
            let (received, lost) = self.processor.packet_counts();
            packet_stats.push_generation(received, lost);
            if self.frame_index_cur.is_some() && self.frame_index_prev != self.frame_index_cur {
                self.flush(&mut events);
            }
            let next_expected = self.frame_index_prev_complete.wrapping_add(1);
            if gt16(frame_index, next_expected) && !(frame_index == 1 && self.frame_index_cur.is_none()) {
                events.push(VideoEvent::Corrupt { start: next_expected, end: frame_index.wrapping_sub(1) });
            }
            self.frame_index_cur = Some(frame_index);
            if self.processor.alloc_frame(packet, data).is_err() {
                self.stats.bad_units += 1;
            }
        }

        if self.processor.put_unit(packet, data).is_err() {
            self.stats.bad_units += 1;
        }

        if self.frame_index_cur != self.frame_index_prev
            && (self.processor.flush_possible() || packet.unit_index + 1 == packet.units_in_frame_total) {
            self.flush(&mut events);
        }
        events
    }

    fn flush(&mut self, events: &mut Vec<VideoEvent>) {
        let cur = self.frame_index_cur.expect("a frame to flush");
        let (result, data) = self.processor.flush();
        match result {
            FlushResult::Failed => {}
            FlushResult::FecFailed => {
                let next_expected = self.frame_index_prev_complete.wrapping_add(1);
                events.push(VideoEvent::Corrupt { start: next_expected, end: cur });
                // The reference's arithmetic: the frame numbers as plain integers, so across the wrap this is negative.
                let lost = cur as i32 - next_expected as i32 + 1;
                self.frames_lost += lost;
                self.stats.frames_lost += lost as i64;
                self.stats.fec_failed += 1;
                self.frame_index_prev = Some(cur);
            }
            FlushResult::Success | FlushResult::FecSuccess => {
                let fec = result == FlushResult::FecSuccess;
                self.stats.frames += 1;
                self.stats.bytes += data.len() as u64;
                self.stats.fec_recovered += fec as u64;
                events.push(VideoEvent::Frame { index: cur, data, fec, frames_lost: self.frames_lost });
                self.frames_lost = 0;
                self.frame_index_prev = Some(cur);
                self.frame_index_prev_complete = cur;
            }
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::frame::tests::{packet, units};

    struct Console {
        receiver: VideoReceiver,
        stats: PacketStats,
    }

    impl Console {
        fn new() -> Self {
            Self { receiver: VideoReceiver::new(1), stats: PacketStats::default() }
        }

        /// Sends a frame's units, leaving out those in skip.
        fn frame(&mut self, index: u16, frame: &[u8], skip: &[usize]) -> Vec<VideoEvent> {
            let units = units(frame, 500, 2);
            let mut events = Vec::new();
            for (i, unit) in units.iter().enumerate().filter(|(i, _)| !skip.contains(i)) {
                events.extend(self.receiver.packet(&packet(index, i, units.len(), 2), unit, &mut self.stats));
            }
            events
        }
    }

    fn frame(seed: u8) -> Vec<u8> {
        (0..1200u32).map(|i| (i as u8).wrapping_mul(seed)).collect()
    }

    fn frames(events: &[VideoEvent]) -> Vec<(u16, bool, i32)> {
        events.iter().filter_map(|e| match e {
            VideoEvent::Frame { index, fec, frames_lost, .. } => Some((*index, *fec, *frames_lost)),
            _ => None,
        }).collect()
    }

    #[test]
    fn frames_in_order() {
        let mut console = Console::new();
        let events = console.frame(1, &frame(3), &[]);
        assert_eq!(events[0], VideoEvent::Profile(0));
        assert_eq!(events[1], VideoEvent::Frame { index: 1, data: frame(3), fec: false, frames_lost: 0 });
        assert_eq!(events.len(), 2);         // flushed once the source units were there; the FEC units only count
        assert_eq!(frames(&console.frame(2, &frame(5), &[])), [(2, false, 0)]);
        assert_eq!(console.stats.take(), (5, 0));
    }

    #[test]
    fn lost_unit_from_fec() {
        let mut console = Console::new();
        let events = console.frame(1, &frame(3), &[1]);
        assert_eq!(events[1], VideoEvent::Frame { index: 1, data: frame(3), fec: true, frames_lost: 0 });
        assert_eq!(console.receiver.stats.fec_recovered, 1);
    }

    #[test]
    fn lost_frames_are_reported() {
        let mut console = Console::new();
        console.frame(1, &frame(3), &[]);
        let events = console.frame(4, &frame(3), &[]);
        assert_eq!(events[0], VideoEvent::Corrupt { start: 2, end: 3 });
        assert_eq!(frames(&events), [(4, false, 0)]);

        // Too many units missing: the frame is reported and counted lost.
        let events = console.frame(5, &frame(3), &[0, 1, 2]);
        assert_eq!(events, [VideoEvent::Corrupt { start: 5, end: 5 }]);
        assert_eq!(frames(&console.frame(6, &frame(3), &[])), [(6, false, 1)]);
        assert_eq!((console.receiver.stats.fec_failed, console.receiver.stats.frames_lost), (1, 1));
    }

    #[test]
    fn old_packets_and_unknown_profiles_are_dropped() {
        let mut console = Console::new();
        console.frame(2, &frame(3), &[]);
        assert!(console.frame(1, &frame(3), &[]).is_empty());
        assert_eq!(console.receiver.stats.old_packets, 5);
        let mut other = packet(3, 0, 4, 2);
        other.adaptive_stream_index = 1;
        assert!(console.receiver.packet(&other, &[0, 0, 1], &mut console.stats).is_empty());
        assert_eq!(console.receiver.stats.bad_profile, 1);
    }
}
