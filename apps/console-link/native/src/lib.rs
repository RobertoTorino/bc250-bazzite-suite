// SPDX-License-Identifier: AGPL-3.0-only
//! The stream layer of Remote Play, ported from the reference (AGPL-3.0): Takion, the SCTP-like transport over UDP
//! 9296, its crypto, and the video frames with their FEC. Each module names the reference file it comes from; the
//! tests compare every function with vectors printed by the reference's own C code (tests/takion_vectors.json of the
//! app) and the FEC with frames recorded by the reference (tests/fec_vectors.json).

pub mod connection;
#[cfg(feature = "decoder")]
pub mod decoder;
pub mod ecdh;
pub mod fec;
pub mod frame;
pub mod gkcrypt;
pub mod keystate;
pub mod reorder;
pub mod sendbuffer;
pub mod seqnum;
pub mod takion;
pub mod video;

#[cfg(feature = "python")]
mod python;

#[cfg(test)]
pub(crate) mod vectors {
    //! The vectors from the reference's C code, shared with the Python tests.
    pub fn load() -> serde_json::Value {
        serde_json::from_str(include_str!("../../tests/takion_vectors.json")).expect("valid vectors")
    }

    pub fn hex(value: &serde_json::Value) -> Vec<u8> {
        let text = value.as_str().expect("a hex string");
        (0..text.len()).step_by(2).map(|i| u8::from_str_radix(&text[i..i + 2], 16).unwrap()).collect()
    }
}
