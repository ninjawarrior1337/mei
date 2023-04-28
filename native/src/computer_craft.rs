use exoquant::{convert_to_indexed, ditherer, optimizer::KMeans};
use image::DynamicImage;
use wasm_bindgen::prelude::*;

use crate::utils;

fn color_conv(c: &image::Rgb<u8>) -> exoquant::Color {
    exoquant::Color {
        r: c.0[0],
        g: c.0[1],
        b: c.0[2],
        a: 255,
    }
}

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

fn process_image(img: DynamicImage, nwidth: u32, nheight: u32) -> CCImage {
    let resized = img
        .resize_exact(nwidth, nheight, image::imageops::FilterType::Nearest)
        .to_rgb8();

    let pix_orig = resized.pixels().map(|p| color_conv(p)).collect::<Vec<_>>();

    let (pal, pix) = convert_to_indexed(
        &pix_orig,
        img.width() as usize,
        16,
        &KMeans,
        &ditherer::None,
    );

    let pal_new = pal
        .iter()
        .map(|c| {
            let mut rgb = c.r as u32;
            rgb = (rgb << 8) + c.g as u32;
            rgb = (rgb << 8) + c.b as u32;
            rgb
        })
        .collect::<Vec<_>>();

    return CCImage {
        width: resized.width() as usize,
        palette: pal_new,
        pix_data: pix,
    };
}

pub fn render_bytes(image_bytes: &[u8], width: u32, height: u32) -> Result<CCImage, JsValue> {
    utils::set_panic_hook();
    let img = image::load_from_memory(image_bytes).map_err(|_| "failed to load image")?;

    return Ok(process_image(img, width, height));
}
