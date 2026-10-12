// SPDX-License-Identifier: AGPL-3.0-only
//! The stream layer of Remote Play, ported from chiaki-ng (AGPL-3.0): Takion, the SCTP-like transport over UDP
//! 9296, and its crypto. Each module names the chiaki-ng file it comes from; the tests compare every function with
//! vectors printed by chiaki-ng's own C code (tests/takion_vectors.json of the app).

pub mod connection;
pub mod ecdh;
pub mod gkcrypt;
pub mod keystate;
pub mod reorder;
pub mod sendbuffer;
pub mod seqnum;
pub mod takion;

#[cfg(feature = "python")]
mod python;

#[cfg(test)]
pub(crate) mod vectors {
    //! The vectors from chiaki-ng's C code, shared with the Python tests.
    pub fn load() -> serde_json::Value {
        serde_json::from_str(include_str!("../../tests/takion_vectors.json")).expect("valid vectors")
    }

    pub fn hex(value: &serde_json::Value) -> Vec<u8> {
        let text = value.as_str().expect("a hex string");
        (0..text.len()).step_by(2).map(|i| u8::from_str_radix(&text[i..i + 2], 16).unwrap()).collect()
    }
}
