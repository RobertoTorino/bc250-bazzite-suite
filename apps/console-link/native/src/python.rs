// SPDX-License-Identifier: AGPL-3.0-or-later
//! The Python module bc250_console_link_core: thin wrappers over the Rust modules. Byte strings in and out; a
//! protocol error is a ValueError with the error's name.

use std::net::{SocketAddr, ToSocketAddrs};
use std::time::Duration;

use pyo3::exceptions::{PyConnectionError, PyOSError, PyTimeoutError, PyValueError};
use pyo3::prelude::*;
use pyo3::types::{PyBytes, PyDict, PyTuple};
use pyo3::IntoPyObjectExt;

use crate::connection::{self, ConnectError, Event};
use crate::ecdh;
use crate::fec;
use crate::gkcrypt;
use crate::keystate;
use crate::takion::{self, Message, TakionError};
use crate::video::VideoEvent;

fn error(err: TakionError) -> PyErr {
    PyValueError::new_err(format!("{err:?}"))
}

fn array<const N: usize>(data: &[u8], what: &str) -> PyResult<[u8; N]> {
    data.try_into().map_err(|_| PyValueError::new_err(format!("{what} must have {N} bytes")))
}

fn bytes<'py>(py: Python<'py>, data: &[u8]) -> Bound<'py, PyBytes> {
    PyBytes::new(py, data)
}

#[pyclass(name = "GkCrypt", module = "bc250_console_link_core")]
struct GkCrypt(gkcrypt::GkCrypt);

#[pymethods]
impl GkCrypt {
    #[new]
    fn new(index: u8, handshake_key: &[u8], ecdh_secret: &[u8]) -> PyResult<Self> {
        Ok(Self(gkcrypt::GkCrypt::new(index, &array(handshake_key, "handshake_key")?, &array(ecdh_secret, "ecdh_secret")?)))
    }

    #[getter]
    fn index(&self) -> u8 {
        self.0.index
    }

    #[getter]
    fn key_base<'py>(&self, py: Python<'py>) -> Bound<'py, PyBytes> {
        bytes(py, &self.0.key_base)
    }

    #[getter]
    fn iv<'py>(&self, py: Python<'py>) -> Bound<'py, PyBytes> {
        bytes(py, &self.0.iv)
    }

    #[getter]
    fn key_gmac_base<'py>(&self, py: Python<'py>) -> Bound<'py, PyBytes> {
        bytes(py, &self.0.key_gmac_base)
    }

    fn key_stream<'py>(&self, py: Python<'py>, key_pos: u64, size: usize) -> Bound<'py, PyBytes> {
        bytes(py, &self.0.key_stream(key_pos, size))
    }

    /// Encrypts or decrypts data that sits at key_pos in the stream.
    fn crypt<'py>(&self, py: Python<'py>, key_pos: u64, data: &[u8]) -> Bound<'py, PyBytes> {
        let mut out = data.to_vec();
        self.0.crypt(key_pos, &mut out);
        bytes(py, &out)
    }

    fn gmac<'py>(&mut self, py: Python<'py>, key_pos: u64, data: &[u8]) -> Bound<'py, PyBytes> {
        bytes(py, &self.0.gmac(key_pos, data))
    }
}

#[pyclass(name = "Ecdh", module = "bc250_console_link_core")]
struct Ecdh(ecdh::Ecdh);

#[pymethods]
impl Ecdh {
    /// A new key pair, or the one of private_key (32 bytes).
    #[new]
    #[pyo3(signature = (private_key=None))]
    fn new(private_key: Option<&[u8]>) -> PyResult<Self> {
        match private_key {
            None => Ok(Self(ecdh::Ecdh::generate())),
            Some(key) => ecdh::Ecdh::from_private(key)
                .map(Self)
                .map_err(|_| PyValueError::new_err("not a secp256k1 private key")),
        }
    }

    fn public_key<'py>(&self, py: Python<'py>) -> Bound<'py, PyBytes> {
        bytes(py, &self.0.public_key())
    }

    fn signed_public_key<'py>(&self, py: Python<'py>, handshake_key: &[u8]) -> PyResult<(Bound<'py, PyBytes>, Bound<'py, PyBytes>)> {
        let (public, signature) = self.0.signed_public_key(&array(handshake_key, "handshake_key")?);
        Ok((bytes(py, &public), bytes(py, &signature)))
    }

    fn derive_secret<'py>(&self, py: Python<'py>, remote_public: &[u8]) -> PyResult<Bound<'py, PyBytes>> {
        self.0
            .derive_secret(remote_public)
            .map(|secret| bytes(py, &secret))
            .map_err(|_| PyValueError::new_err("not a secp256k1 public key"))
    }
}

#[pyfunction]
fn verify_signature(handshake_key: &[u8], public_key: &[u8], signature: &[u8]) -> PyResult<bool> {
    Ok(ecdh::verify(&array(handshake_key, "handshake_key")?, public_key, signature))
}

#[pyclass(name = "KeyState", module = "bc250_console_link_core")]
#[derive(Default)]
struct KeyState(keystate::KeyState);

#[pymethods]
impl KeyState {
    #[new]
    fn new() -> Self {
        Self::default()
    }

    #[pyo3(signature = (low, commit=true))]
    fn request_pos(&mut self, low: u32, commit: bool) -> u64 {
        self.0.request_pos(low, commit)
    }

    fn commit(&mut self, pos: u64) {
        self.0.commit(pos)
    }
}

/// The packet with its GMAC filled in, the GMAC, and the MAC field as it was before.
#[pyfunction]
#[pyo3(signature = (crypt, packet, key_pos))]
fn packet_mac<'py>(
    py: Python<'py>,
    crypt: Option<&mut GkCrypt>,
    packet: &[u8],
    key_pos: u64,
) -> PyResult<(Bound<'py, PyBytes>, Bound<'py, PyBytes>, Bound<'py, PyBytes>)> {
    let mut buf = packet.to_vec();
    let (mac, old) = takion::packet_mac(crypt.map(|c| &mut c.0), &mut buf, key_pos).map_err(error)?;
    Ok((bytes(py, &buf), bytes(py, &mac), bytes(py, &old)))
}

/// The key position of a received packet whose GMAC checks out; ValueError("MacMismatch") otherwise.
#[pyfunction]
fn verify_packet(crypt: Option<&mut GkCrypt>, key_state: &mut KeyState, packet: &[u8]) -> PyResult<u64> {
    let mut buf = packet.to_vec();
    takion::verify_packet(crypt.map(|c| &mut c.0), &mut key_state.0, &mut buf).map_err(error)
}

#[pyfunction]
fn key_pos_advance(data_size: usize) -> u64 {
    takion::key_pos_advance(data_size)
}

#[pyfunction]
fn parse_message<'py>(py: Python<'py>, buf: &[u8], tag_local: u32, key_state: &mut KeyState) -> PyResult<Bound<'py, PyDict>> {
    let message = takion::parse_message(buf, tag_local, &mut key_state.0).map_err(error)?;
    let dict = PyDict::new(py);
    dict.set_item("tag", message.tag)?;
    dict.set_item("key_pos", message.key_pos)?;
    dict.set_item("chunk_type", message.chunk_type)?;
    dict.set_item("chunk_flags", message.chunk_flags)?;
    dict.set_item("payload", bytes(py, message.payload))?;
    Ok(dict)
}

fn message(chunk_type: u8, payload: &[u8]) -> Message<'_> {
    Message { tag: 0, key_pos: 0, chunk_type, chunk_flags: 0, payload }
}

/// An INIT_ACK's payload: the console's tag, window, stream counts, initial sequence number and cookie.
#[pyfunction]
fn parse_init_ack<'py>(py: Python<'py>, payload: &[u8]) -> PyResult<Bound<'py, PyDict>> {
    let init = takion::parse_init_ack(&message(takion::CHUNK_INIT_ACK, payload)).map_err(error)?;
    let dict = PyDict::new(py);
    dict.set_item("tag", init.tag)?;
    dict.set_item("a_rwnd", init.a_rwnd)?;
    dict.set_item("outbound_streams", init.outbound_streams)?;
    dict.set_item("inbound_streams", init.inbound_streams)?;
    dict.set_item("initial_seq_num", init.initial_seq_num)?;
    dict.set_item("cookie", bytes(py, &init.cookie))?;
    Ok(dict)
}

#[pyfunction]
fn parse_data<'py>(py: Python<'py>, payload: &[u8]) -> PyResult<(u32, u16, u8, Bound<'py, PyBytes>)> {
    let data = takion::parse_data(&message(takion::CHUNK_DATA, payload)).map_err(error)?;
    Ok((data.seq_num, data.channel, data.data_type, bytes(py, data.data)))
}

#[pyfunction]
fn parse_data_ack(payload: &[u8]) -> PyResult<(u32, u32)> {
    takion::parse_data_ack(&message(takion::CHUNK_DATA_ACK, payload)).map_err(error)
}

#[pyfunction]
fn init_packet<'py>(py: Python<'py>, tag_local: u32, initial_seq_num: u32) -> Bound<'py, PyBytes> {
    bytes(py, &takion::init_packet(tag_local, initial_seq_num))
}

#[pyfunction]
fn cookie_packet<'py>(py: Python<'py>, tag_remote: u32, cookie: &[u8]) -> Bound<'py, PyBytes> {
    bytes(py, &takion::cookie_packet(tag_remote, cookie))
}

#[pyfunction]
fn message_packet<'py>(py: Python<'py>, tag: u32, key_pos: u64, chunk_type: u8, chunk_flags: u8, payload: &[u8]) -> Bound<'py, PyBytes> {
    bytes(py, &takion::message_packet(tag, key_pos, chunk_type, chunk_flags, payload))
}

#[pyfunction]
#[allow(clippy::too_many_arguments)]
fn data_packet<'py>(py: Python<'py>, tag_remote: u32, key_pos: u64, chunk_flags: u8, seq_num: u32, channel: u16, data: &[u8]) -> Bound<'py, PyBytes> {
    bytes(py, &takion::data_packet(tag_remote, key_pos, chunk_flags, seq_num, channel, data))
}

#[pyfunction]
fn data_ack_packet<'py>(py: Python<'py>, tag_remote: u32, key_pos: u64, seq_num: u32, a_rwnd: u32) -> Bound<'py, PyBytes> {
    bytes(py, &takion::data_ack_packet(tag_remote, key_pos, seq_num, a_rwnd))
}

#[pyfunction]
fn congestion_packet<'py>(py: Python<'py>, word_0: u16, received: u16, lost: u16, key_pos: u64) -> Bound<'py, PyBytes> {
    bytes(py, &takion::congestion_packet(word_0, received, lost, key_pos))
}

fn av_dict<'py>(py: Python<'py>, av: &takion::AvPacket) -> PyResult<Bound<'py, PyDict>> {
    let dict = PyDict::new(py);
    dict.set_item("packet_index", av.packet_index)?;
    dict.set_item("frame_index", av.frame_index)?;
    dict.set_item("nalu", av.uses_nalu_info_structs)?;
    dict.set_item("video", av.is_video)?;
    dict.set_item("haptics", av.is_haptics)?;
    dict.set_item("unit_index", av.unit_index)?;
    dict.set_item("units_total", av.units_in_frame_total)?;
    dict.set_item("units_fec", av.units_in_frame_fec)?;
    dict.set_item("codec", av.codec)?;
    dict.set_item("word_at_0x18", av.word_at_0x18)?;
    dict.set_item("adaptive_stream_index", av.adaptive_stream_index)?;
    dict.set_item("byte_at_0x2c", av.byte_at_0x2c)?;
    dict.set_item("key_pos", av.key_pos)?;
    dict.set_item("data_offset", av.data_offset)?;
    Ok(dict)
}

/// A video or audio packet's header (Takion version 7, 9 or 12) as a dict; data_offset is where its data starts.
#[pyfunction]
fn parse_av<'py>(py: Python<'py>, version: u8, packet: &[u8], key_state: &mut KeyState) -> PyResult<Bound<'py, PyDict>> {
    let av = takion::parse_av(version, packet, &mut key_state.0).map_err(error)?;
    av_dict(py, &av)
}

/// A version 7 header (the network test's pings); the fields as parse_av names them.
#[pyfunction]
#[pyo3(signature = (*, video=false, nalu=false, packet_index=0, frame_index=0, unit_index=0, units_total=1,
                    units_fec=0, codec=0, key_pos=0, word_at_0x18=0, adaptive_stream_index=0))]
#[allow(clippy::too_many_arguments)]
fn v7_av_header<'py>(py: Python<'py>, video: bool, nalu: bool, packet_index: u16, frame_index: u16, unit_index: u16,
                     units_total: u16, units_fec: u16, codec: u8, key_pos: u64, word_at_0x18: u16,
                     adaptive_stream_index: u8) -> Bound<'py, PyBytes> {
    let packet = takion::AvPacket {
        is_video: video,
        uses_nalu_info_structs: nalu,
        packet_index,
        frame_index,
        unit_index,
        units_in_frame_total: units_total,
        units_in_frame_fec: units_fec,
        codec,
        key_pos,
        word_at_0x18,
        adaptive_stream_index,
        ..Default::default()
    };
    bytes(py, &takion::v7_av_header(&packet))
}

#[pyfunction]
fn data_cont_packet<'py>(py: Python<'py>, tag_remote: u32, key_pos: u64, chunk_flags: u8, seq_num: u32, channel: u16, data: &[u8]) -> Bound<'py, PyBytes> {
    bytes(py, &takion::data_cont_packet(tag_remote, key_pos, chunk_flags, seq_num, channel, data))
}

/// The m FEC units for k source units of unit_size bytes each, one after another in buf: buf with them added.
#[pyfunction]
fn fec_encode<'py>(py: Python<'py>, buf: &[u8], unit_size: usize, k: usize, m: usize) -> PyResult<Bound<'py, PyBytes>> {
    let mut units = buf.to_vec();
    units.resize(unit_size * (k + m), 0);
    fec::encode(&mut units, unit_size, unit_size, k, m).map_err(|e| PyValueError::new_err(format!("{e:?}")))?;
    Ok(bytes(py, &units))
}

/// The k source units rebuilt from k + m units of unit_size bytes, those at the indexes in erasures missing.
#[pyfunction]
fn fec_decode<'py>(py: Python<'py>, buf: &[u8], unit_size: usize, k: usize, m: usize, erasures: Vec<usize>)
    -> PyResult<Bound<'py, PyBytes>> {
    let mut units = buf.to_vec();
    fec::decode(&mut units, unit_size, unit_size, k, m, &erasures).map_err(|e| PyValueError::new_err(format!("{e:?}")))?;
    Ok(bytes(py, &units[..unit_size * k]))
}

fn resolve(host: &str, port: u16) -> PyResult<SocketAddr> {
    (host, port)
        .to_socket_addrs()
        .map_err(|e| PyOSError::new_err(format!("{host}: {e}")))?
        .next()
        .ok_or_else(|| PyOSError::new_err(format!("{host}: no address")))
}

/// A live Takion connection (connection.rs). The constructor connects and runs the handshake, without the GIL;
/// TimeoutError when the console does not answer, ConnectionError when it answers wrongly.
#[pyclass(name = "Takion", module = "bc250_console_link_core", frozen)]
struct Takion(connection::Connection);

#[pymethods]
impl Takion {
    #[new]
    #[pyo3(signature = (host, port=connection::PORT, version=12, timeout=5.0, tries=connection::CONNECT_TRIES, crypt=true))]
    fn new(py: Python<'_>, host: &str, port: u16, version: u8, timeout: f64, tries: u32, crypt: bool) -> PyResult<Self> {
        if ![7, 9, 12].contains(&version) {
            return Err(PyValueError::new_err("version is 7, 9 or 12"));
        }
        let addr = resolve(host, port)?;
        let timeout = Duration::from_secs_f64(timeout.max(0.001));
        py.allow_threads(|| connection::Connection::connect(addr, version, crypt, timeout, tries))
            .map(Self)
            .map_err(|e| match e {
                ConnectError::Timeout(_) => PyTimeoutError::new_err(e.to_string()),
                ConnectError::Invalid(_) => PyConnectionError::new_err(e.to_string()),
                ConnectError::Io(_) => PyOSError::new_err(e.to_string()),
            })
    }

    #[getter]
    fn tag_local(&self) -> u32 {
        self.0.tag_local()
    }

    #[getter]
    fn tag_remote(&self) -> u32 {
        self.0.tag_remote()
    }

    #[getter]
    fn version(&self) -> u8 {
        self.0.version()
    }

    fn set_crypt(&self, handshake_key: &[u8], ecdh_secret: &[u8]) -> PyResult<()> {
        self.0.set_crypt(&array(handshake_key, "handshake_key")?, &array(ecdh_secret, "ecdh_secret")?);
        Ok(())
    }

    /// Sends a DATA message and returns its sequence number; cont=True continues the previous message.
    #[pyo3(signature = (data, channel=connection::CHANNEL_DEFAULT, flags=1, cont=false))]
    fn send_data(&self, data: &[u8], channel: u16, flags: u8, cont: bool) -> PyResult<u32> {
        self.0.send_data(flags, channel, data, cont).map_err(|e| PyOSError::new_err(e.to_string()))
    }

    /// A packet as it is, unsigned and not resent (the network test's pings).
    fn send_raw(&self, packet: &[u8]) -> PyResult<()> {
        self.0.send_raw(packet).map_err(|e| PyOSError::new_err(e.to_string()))
    }

    fn send_congestion(&self, word_0: u16, received: u16, lost: u16) -> PyResult<()> {
        self.0.send_congestion(word_0, received, lost).map_err(|e| PyOSError::new_err(e.to_string()))
    }

    /// The stream runs (after STREAMINFO, with its number of resolutions): video comes as frames from now on, and
    /// congestion reports go every 200 ms.
    #[pyo3(signature = (profiles, packet_loss_max=connection::PACKET_LOSS_MAX))]
    fn start_stream(&self, profiles: usize, packet_loss_max: f64) -> PyResult<()> {
        self.0.start_stream(profiles, packet_loss_max).map_err(|e| PyOSError::new_err(e.to_string()))
    }

    /// The video receiver's counters once the stream runs, else None.
    fn video_stats<'py>(&self, py: Python<'py>) -> PyResult<Option<Bound<'py, PyDict>>> {
        let Some(s) = self.0.video_stats() else { return Ok(None) };
        let dict = PyDict::new(py);
        for (name, value) in [
            ("frames", s.frames), ("bytes", s.bytes), ("fec_recovered", s.fec_recovered), ("fec_failed", s.fec_failed),
            ("old_packets", s.old_packets), ("bad_profile", s.bad_profile), ("bad_units", s.bad_units),
        ] {
            dict.set_item(name, value)?;
        }
        dict.set_item("frames_lost", s.frames_lost)?;
        Ok(Some(dict))
    }

    /// The next event or None after timeout seconds: ("data", data_type, channel, bytes), ("data_ack", seq_num),
    /// ("av", header dict, decrypted bytes) or ("closed", reason). Once the stream runs, "av" is audio only and
    /// video comes as ("frame", {"index", "fec", "frames_lost"}, bytes), ("profile", resolution index) and
    /// ("corrupt", first frame, last frame), the frames to report to the console.
    #[pyo3(signature = (timeout=0.0))]
    fn next_event<'py>(&self, py: Python<'py>, timeout: f64) -> PyResult<Option<Bound<'py, PyTuple>>> {
        let timeout = Duration::from_secs_f64(timeout.max(0.0));
        let Some(event) = py.allow_threads(|| self.0.next_event(timeout)) else { return Ok(None) };
        let items: Vec<PyObject> = match event {
            Event::Data { data_type, channel, data } => vec![
                "data".into_py_any(py)?, data_type.into_py_any(py)?, channel.into_py_any(py)?, bytes(py, &data).into_py_any(py)?,
            ],
            Event::DataAck(seq_num) => vec!["data_ack".into_py_any(py)?, seq_num.into_py_any(py)?],
            Event::Av { packet, data } => vec!["av".into_py_any(py)?, av_dict(py, &packet)?.into_py_any(py)?, bytes(py, &data).into_py_any(py)?],
            Event::Closed(reason) => vec!["closed".into_py_any(py)?, reason.into_py_any(py)?],
            Event::Video(VideoEvent::Frame { index, data, fec, frames_lost }) => {
                let info = PyDict::new(py);
                info.set_item("index", index)?;
                info.set_item("fec", fec)?;
                info.set_item("frames_lost", frames_lost)?;
                vec!["frame".into_py_any(py)?, info.into_py_any(py)?, bytes(py, &data).into_py_any(py)?]
            }
            Event::Video(VideoEvent::Profile(index)) => vec!["profile".into_py_any(py)?, index.into_py_any(py)?],
            Event::Video(VideoEvent::Corrupt { start, end }) => {
                vec!["corrupt".into_py_any(py)?, start.into_py_any(py)?, end.into_py_any(py)?]
            }
        };
        Ok(Some(PyTuple::new(py, items)?))
    }

    /// Counters: packets received, MAC mismatches, invalid packets, data and video dropped, video skipped after
    /// the reorder timeout, messages resent and given up, congestion reports sent.
    fn stats<'py>(&self, py: Python<'py>) -> PyResult<Bound<'py, PyDict>> {
        let s = self.0.stats();
        let dict = PyDict::new(py);
        for (name, value) in [
            ("received", s.received), ("mac_mismatch", s.mac_mismatch), ("invalid", s.invalid),
            ("data_dropped", s.data_dropped), ("video_dropped", s.video_dropped), ("video_skipped", s.video_skipped),
            ("resent", s.resent), ("given_up", s.given_up), ("congestion_reports", s.congestion_reports),
        ] {
            dict.set_item(name, value)?;
        }
        Ok(dict)
    }

    fn close(&self, py: Python<'_>) {
        py.allow_threads(|| self.0.close());
    }
}

/// The video decoder (decoder.rs): Decoder(codec="h264" or "hevc", hw=True). decode(sample) gives the frames it
/// completed as dicts (width, height, hw); image() the last one's picture as (format, width, height, bytes).
/// hw tells whether VA-API runs, hw_error why not when it was asked for.
#[cfg(feature = "decoder")]
#[pyclass(name = "Decoder", module = "bc250_console_link_core", unsendable)]
struct Decoder(crate::decoder::Decoder);

#[cfg(feature = "decoder")]
fn decode_error(e: crate::decoder::DecodeError) -> PyErr {
    PyValueError::new_err(e.message)
}

#[cfg(feature = "decoder")]
#[pymethods]
impl Decoder {
    #[new]
    #[pyo3(signature = (codec="h264", hw=true))]
    fn new(codec: &str, hw: bool) -> PyResult<Self> {
        let hevc = match codec {
            "h264" => false,
            "h265" | "hevc" => true,
            _ => return Err(PyValueError::new_err("codec is h264 or hevc")),
        };
        crate::decoder::Decoder::new(hevc, hw).map(Self).map_err(decode_error)
    }

    #[getter]
    fn hw(&self) -> bool {
        self.0.hw()
    }

    #[getter]
    fn hw_error(&self) -> Option<String> {
        self.0.hw_error.as_ref().map(|e| e.message.clone())
    }

    fn decode<'py>(&mut self, py: Python<'py>, sample: &[u8]) -> PyResult<Vec<Bound<'py, PyDict>>> {
        let frames = self.0.decode(sample).map_err(decode_error)?;
        frames.into_iter().map(|frame| {
            let dict = PyDict::new(py);
            dict.set_item("width", frame.width)?;
            dict.set_item("height", frame.height)?;
            dict.set_item("hw", frame.hw)?;
            Ok(dict)
        }).collect()
    }

    fn image<'py>(&mut self, py: Python<'py>) -> PyResult<(String, u32, u32, Bound<'py, PyBytes>)> {
        let image = self.0.image().map_err(decode_error)?;
        Ok((image.format, image.width, image.height, bytes(py, &image.data)))
    }
}

#[pymodule]
fn bc250_console_link_core(m: &Bound<'_, PyModule>) -> PyResult<()> {
    m.add("__version__", env!("CARGO_PKG_VERSION"))?;
    m.add("DECODER", cfg!(feature = "decoder"))?;
    #[cfg(feature = "decoder")]
    {
        m.add_class::<Decoder>()?;
        m.add("FFMPEG_VERSION", crate::decoder::ffmpeg_version())?;
    }
    m.add_class::<GkCrypt>()?;
    m.add_class::<Ecdh>()?;
    m.add_class::<KeyState>()?;
    m.add_function(wrap_pyfunction!(verify_signature, m)?)?;
    m.add_function(wrap_pyfunction!(packet_mac, m)?)?;
    m.add_function(wrap_pyfunction!(verify_packet, m)?)?;
    m.add_function(wrap_pyfunction!(key_pos_advance, m)?)?;
    m.add_function(wrap_pyfunction!(parse_message, m)?)?;
    m.add_function(wrap_pyfunction!(parse_init_ack, m)?)?;
    m.add_function(wrap_pyfunction!(parse_data, m)?)?;
    m.add_function(wrap_pyfunction!(parse_data_ack, m)?)?;
    m.add_function(wrap_pyfunction!(init_packet, m)?)?;
    m.add_function(wrap_pyfunction!(cookie_packet, m)?)?;
    m.add_function(wrap_pyfunction!(message_packet, m)?)?;
    m.add_function(wrap_pyfunction!(data_packet, m)?)?;
    m.add_function(wrap_pyfunction!(data_ack_packet, m)?)?;
    m.add_function(wrap_pyfunction!(congestion_packet, m)?)?;
    m.add_function(wrap_pyfunction!(parse_av, m)?)?;
    m.add_function(wrap_pyfunction!(data_cont_packet, m)?)?;
    m.add_function(wrap_pyfunction!(v7_av_header, m)?)?;
    m.add_function(wrap_pyfunction!(fec_encode, m)?)?;
    m.add_function(wrap_pyfunction!(fec_decode, m)?)?;
    m.add_class::<Takion>()?;
    for (name, value) in [
        ("PACKET_CONTROL", takion::PACKET_CONTROL),
        ("PACKET_VIDEO", takion::PACKET_VIDEO),
        ("PACKET_AUDIO", takion::PACKET_AUDIO),
        ("PACKET_CONGESTION", takion::PACKET_CONGESTION),
        ("CHUNK_DATA", takion::CHUNK_DATA),
        ("CHUNK_INIT", takion::CHUNK_INIT),
        ("CHUNK_INIT_ACK", takion::CHUNK_INIT_ACK),
        ("CHUNK_DATA_ACK", takion::CHUNK_DATA_ACK),
        ("CHUNK_COOKIE", takion::CHUNK_COOKIE),
        ("CHUNK_COOKIE_ACK", takion::CHUNK_COOKIE_ACK),
    ] {
        m.add(name, value)?;
    }
    m.add("A_RWND", takion::A_RWND)?;
    m.add("PORT", connection::PORT)?;
    Ok(())
}
