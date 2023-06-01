pub mod quantizers;
pub mod serializers;

use image::DynamicImage;

use wasm_bindgen::prelude::*;

use self::{quantizers::{Quantizer, exoquant::Exoquant}, serializers::CCImageSerializer};

use super::utils;

#[derive(Debug)]
#[wasm_bindgen]
/// An intermediary representation of a ComputerCraft image.
pub struct CCImage {
    pub width: u32,
    pub height: u32,
    /// The palette of the image, as an array of 16 24-bit RGB values.
    palette: Vec<u32>,
    /// The pixel data of the image, as an array of 8-bit indices into the palette.
    pix_data: Vec<u8>,
}

#[wasm_bindgen]
impl CCImage {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        CCImage {
            width: 0,
            height: 0,
            palette: vec![],
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

pub struct ImageRenderer<Q, S>
where Q: Quantizer,
      S: CCImageSerializer {
    width: u32,
    height: u32,
    image: Option<DynamicImage>,
    quantizer: Option<Q>,
    serializer: Option<S>
}

impl<Q, S> ImageRenderer<Q, S>
where Q: Quantizer,
      S: CCImageSerializer {
    pub fn new(width: u32, height: u32) -> ImageRenderer<Q, S> {
        ImageRenderer {
            width,
            height,
            image: None,
            quantizer: None,
            serializer: None
        }
    }

    pub fn image(mut self, image: DynamicImage) -> ImageRenderer<Q, S> {
        self.image = Some(image);
        self
    }

    pub fn quantizer(mut self, quantizer: Q) -> ImageRenderer<Q, S> {
        self.quantizer = Some(quantizer);
        self
    }

    pub fn serializer(mut self, serializer: S) -> ImageRenderer<Q, S> {
        self.serializer = Some(serializer);
        self
    }

    pub fn render(self) -> Vec<u8> {
        let q = self.quantizer.unwrap();
        let s = self.serializer.unwrap();

        let cc = q.quantize(self.image.unwrap(), self.width, self.height);
        let out = s.serialize(&cc);
        out
    }
}

pub fn render_bytes(image_bytes: &[u8], width: u32, height: u32) -> Result<CCImage, JsValue> {
    utils::set_panic_hook();
    let img = image::load_from_memory(image_bytes).map_err(|_| "failed to load image")?;
    let cc = Exoquant::new().quantize(img, width, height);

    return Ok(cc);
}
