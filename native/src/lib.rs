mod utils;
pub mod computer_craft;

use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

#[wasm_bindgen(js_name = "cc")]
pub struct ComputerCraft;

#[wasm_bindgen(js_class = "cc")]
impl ComputerCraft {
    pub fn render(data: &[u8], width: u32, height: u32) -> Result<computer_craft::CCImage, JsValue> {
        computer_craft::render_bytes(data, width, height)
    }
}

#[wasm_bindgen(js_name = "hatsuon")]
pub struct Hatsuon;

#[wasm_bindgen(js_class = "hatsuon")]
impl Hatsuon {
    pub fn render(string: &str, pitches: &[u8]) -> Result<Vec<u8>, String> {
        hatsuon::render_wasm(string, pitches)
    }
}