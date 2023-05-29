pub mod craftos;
pub mod quantizers;

use wasm_bindgen::prelude::*;

use super::utils;

#[derive(Debug)]
#[wasm_bindgen]
pub struct CCImage {
    pub width: usize,
    palette: Vec<u32>,
    pix_data: Vec<u8>,
}

#[wasm_bindgen]
impl CCImage {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        CCImage {
            width: 0,
            palette: vec![21, 23, 31, 3, 231, 13],
            pix_data: vec![],
        }
    }

    #[wasm_bindgen(getter)]
    pub fn palette(&self) -> js_sys::Uint32Array {
        js_sys::Uint32Array::from(self.palette.as_slice())
    }

    #[wasm_bindgen(getter)]
    pub fn pix_data(&self) -> js_sys::Uint8Array {
        js_sys::Uint8Array::from(self.pix_data.as_slice())
    }
}

pub fn render_bytes(image_bytes: &[u8], width: u32, height: u32) -> Result<CCImage, JsValue> {
    utils::set_panic_hook();
    let img = image::load_from_memory(image_bytes).map_err(|_| "failed to load image")?;
    let e = quantizers::exoquant::Exoquant;
    let cc = quantizers::Quantizer::quantize(&e, img, width, height);

    return Ok(cc);
}
