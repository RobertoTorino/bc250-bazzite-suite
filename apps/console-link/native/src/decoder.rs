// SPDX-License-Identifier: AGPL-3.0-only
//! The video decoder (decoder.c over FFmpeg, as the reference's ffmpegdecoder.c): the stream's header from STREAMINFO
//! first, then the frames. With VA-API when the board's driver opens, else in software. Built only with the cargo
//! feature "decoder", which links the FFmpeg of ffmpeg/build.sh statically.

use std::ffi::{c_char, c_int, CStr};
use std::ptr;

#[repr(C)]
struct RawDecoder {
    _private: [u8; 0],
}

#[repr(C)]
#[derive(Default)]
struct RawFrame {
    width: c_int,
    height: c_int,
    hw: c_int,
}

extern "C" {
    fn bc_decoder_new(hevc: c_int, hw: c_int, out: *mut *mut RawDecoder, hw_error: *mut c_int) -> c_int;
    fn bc_decoder_free(d: *mut RawDecoder);
    fn bc_decoder_hw(d: *mut RawDecoder) -> c_int;
    fn bc_decoder_send(d: *mut RawDecoder, data: *const u8, size: usize) -> c_int;
    fn bc_decoder_receive(d: *mut RawDecoder, info: *mut RawFrame) -> c_int;
    fn bc_decoder_image(d: *mut RawDecoder, format: *mut c_char, format_size: usize, size: *mut usize) -> c_int;
    fn bc_decoder_image_copy(d: *mut RawDecoder, buf: *mut u8, size: usize) -> c_int;
    fn bc_decoder_ffmpeg_version() -> *const c_char;
    fn bc_decoder_error(code: c_int, buf: *mut c_char, size: usize);
}

const EAGAIN: c_int = -11;          // AVERROR(EAGAIN) on Linux

/// FFmpeg's error code and its message.
#[derive(Debug, Clone, PartialEq, Eq)]
pub struct DecodeError {
    pub code: i32,
    pub message: String,
}

impl std::fmt::Display for DecodeError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.message)
    }
}

fn error(code: c_int) -> DecodeError {
    let mut buf = [0 as c_char; 128];
    // SAFETY: av_strerror writes a NUL-terminated string of at most buf.len() bytes.
    let message = unsafe {
        bc_decoder_error(code, buf.as_mut_ptr(), buf.len());
        CStr::from_ptr(buf.as_ptr()).to_string_lossy().into_owned()
    };
    DecodeError { code, message }
}

fn check(code: c_int) -> Result<c_int, DecodeError> {
    if code < 0 { Err(error(code)) } else { Ok(code) }
}

pub fn ffmpeg_version() -> String {
    // SAFETY: av_version_info returns a static string.
    unsafe { CStr::from_ptr(bc_decoder_ffmpeg_version()).to_string_lossy().into_owned() }
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub struct Frame {
    pub width: u32,
    pub height: u32,
    pub hw: bool,
}

#[derive(Debug, PartialEq, Eq)]
pub struct Image {
    pub format: String,
    pub width: u32,
    pub height: u32,
    pub data: Vec<u8>,
}

pub struct Decoder {
    raw: *mut RawDecoder,
    last: Option<Frame>,
    /// Why VA-API did not open, when it was asked for and the decoder runs in software.
    pub hw_error: Option<DecodeError>,
}

// SAFETY: the decoder is used by one thread at a time (&mut self); FFmpeg's context has no thread affinity.
unsafe impl Send for Decoder {}

impl Decoder {
    pub fn new(hevc: bool, hw: bool) -> Result<Self, DecodeError> {
        let mut raw = ptr::null_mut();
        let mut hw_error = 0;
        // SAFETY: out-pointers to locals; on success raw is a decoder we own.
        check(unsafe { bc_decoder_new(hevc as c_int, hw as c_int, &mut raw, &mut hw_error) })?;
        Ok(Self { raw, last: None, hw_error: (hw_error < 0).then(|| error(hw_error)) })
    }

    pub fn hw(&self) -> bool {
        // SAFETY: raw is valid until drop.
        unsafe { bc_decoder_hw(self.raw) != 0 }
    }

    fn receive(&mut self, frames: &mut Vec<Frame>) -> Result<(), DecodeError> {
        loop {
            let mut info = RawFrame::default();
            // SAFETY: raw is valid; info is a local.
            if check(unsafe { bc_decoder_receive(self.raw, &mut info) })? == 0 {
                return Ok(());
            }
            let frame = Frame { width: info.width as u32, height: info.height as u32, hw: info.hw != 0 };
            self.last = Some(frame);
            frames.push(frame);
        }
    }

    /// One sample (the header or a frame); the frames it completes. A decoder holding frames back takes the
    /// sample after giving them out.
    pub fn decode(&mut self, data: &[u8]) -> Result<Vec<Frame>, DecodeError> {
        let mut frames = Vec::new();
        loop {
            // SAFETY: raw is valid; data is copied before the call returns.
            match unsafe { bc_decoder_send(self.raw, data.as_ptr(), data.len()) } {
                EAGAIN => self.receive(&mut frames)?,
                code => {
                    check(code)?;
                    break;
                }
            }
        }
        self.receive(&mut frames)?;
        Ok(frames)
    }

    /// The last frame's picture in memory (from the GPU for VA-API): yuv420p or nv12, planes without padding.
    pub fn image(&mut self) -> Result<Image, DecodeError> {
        let frame = self.last.ok_or_else(|| DecodeError { code: -22, message: "no frame decoded yet".into() })?;
        let mut format = [0 as c_char; 32];
        let mut size = 0usize;
        // SAFETY: raw is valid; format and size are locals of the given sizes.
        check(unsafe { bc_decoder_image(self.raw, format.as_mut_ptr(), format.len(), &mut size) })?;
        let mut data = vec![0u8; size];
        // SAFETY: data has the size bc_decoder_image asked for.
        let written = check(unsafe { bc_decoder_image_copy(self.raw, data.as_mut_ptr(), data.len()) })?;
        data.truncate(written as usize);
        // SAFETY: snprintf wrote a NUL-terminated string.
        let format = unsafe { CStr::from_ptr(format.as_ptr()) }.to_string_lossy().into_owned();
        Ok(Image { format, width: frame.width, height: frame.height, data })
    }
}

impl Drop for Decoder {
    fn drop(&mut self) {
        // SAFETY: raw came from bc_decoder_new and is freed once.
        unsafe { bc_decoder_free(self.raw) }
    }
}

#[cfg(test)]
mod tests {
    //! Clips encoded with x264 and x265 (tests/video_vectors.json), checked against the system FFmpeg's decode of
    //! the same clips. Software decoding of H.264 and HEVC is exact, so the pictures must match byte for byte.
    use super::*;
    use sha2::{Digest, Sha256};

    fn base64(text: &str) -> Vec<u8> {
        let value = |c: u8| match c {
            b'A'..=b'Z' => c - b'A',
            b'a'..=b'z' => c - b'a' + 26,
            b'0'..=b'9' => c - b'0' + 52,
            b'+' => 62,
            b'/' => 63,
            _ => panic!("not base64"),
        };
        let digits: Vec<u8> = text.bytes().filter(|&c| c != b'=').map(value).collect();
        let mut out = Vec::new();
        for chunk in digits.chunks(4) {
            let n = chunk.iter().enumerate().fold(0u32, |n, (i, &d)| n | (d as u32) << (18 - 6 * i));
            out.extend_from_slice(&n.to_be_bytes()[1..chunk.len()]);
        }
        out
    }

    #[test]
    fn clips_decode_as_ffmpeg_does() {
        let vectors: serde_json::Value =
            serde_json::from_str(include_str!("../../tests/video_vectors.json")).expect("valid vectors");
        for (name, clip) in vectors["clips"].as_object().unwrap() {
            let mut decoder = Decoder::new(name == "hevc", false).unwrap();
            assert!(!decoder.hw());
            let mut hash = Sha256::new();
            let mut frames = 0;
            for sample in clip["samples"].as_array().unwrap() {
                for frame in decoder.decode(&base64(sample.as_str().unwrap())).unwrap() {
                    assert_eq!((frame.width, frame.height), (clip["width"].as_u64().unwrap() as u32,
                                                             clip["height"].as_u64().unwrap() as u32));
                    let image = decoder.image().unwrap();
                    assert_eq!(image.format, "yuv420p");
                    hash.update(&image.data);
                    frames += 1;
                }
            }
            // The clips have no B-frames, so every frame comes out with its sample; none are left to flush.
            assert_eq!(frames, clip["frames"].as_u64().unwrap(), "{name}");
            let digest: String = hash.finalize().iter().map(|b| format!("{b:02x}")).collect();
            assert_eq!(digest, clip["sha256"].as_str().unwrap(), "{name}");
        }
    }

    #[test]
    fn garbage_is_an_error_not_a_crash() {
        let mut decoder = Decoder::new(false, false).unwrap();
        assert!(decoder.image().is_err());
        let result = decoder.decode(&[0, 0, 0, 1, 0x65, 0xff, 0xff, 0xff]);
        assert!(result.map(|frames| frames.is_empty()).unwrap_or(true));
        assert!(!ffmpeg_version().is_empty());
    }
}
