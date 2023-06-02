mod utils;
use wasm_bindgen::prelude::*;
use rokujuuyon::{CCImage, quantizers::{imagequant::ImageQuant, Quantizer}};

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(all(feature = "wee_alloc", target_family="wasm"))]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub struct CCImageMei(CCImage);

#[wasm_bindgen]
impl CCImageMei {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        CCImageMei(CCImage {
            width: 0,
            height: 0,
            palette: vec![],
            pix_data: vec![],
        })
    }

    #[wasm_bindgen(getter)]
    pub fn palette(&self) -> js_sys::Uint32Array {
        js_sys::Uint32Array::from(self.0.palette.as_slice())
    }

    #[wasm_bindgen(getter)]
    pub fn pix_data(&self) -> js_sys::Uint8Array {
        js_sys::Uint8Array::from(self.0.pix_data.as_slice())
    }
}

#[wasm_bindgen(js_name = "cc")]
pub struct ComputerCraft;

#[wasm_bindgen(js_class = "cc")]
impl ComputerCraft {
    pub fn render(data: &[u8], width: u32, height: u32) -> Result<CCImageMei, JsValue> {
        utils::set_panic_hook();
        let img = image::load_from_memory(data).map_err(|_| "failed to load image")?;
        let cc = ImageQuant::new().quantize(img, width, height);
    
        return Ok(CCImageMei(cc));
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