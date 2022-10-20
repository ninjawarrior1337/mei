mod utils;

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

pub mod computer_craft {
    use exoquant::{convert_to_indexed, ditherer, optimizer::KMeans};
    use image::{DynamicImage, GenericImageView};
    use wasm_bindgen::prelude::*;

    fn color_conv(c: image::Rgba<u8>) -> exoquant::Color {
        exoquant::Color { r: c.0[0], g: c.0[1], b: c.0[2], a: c.0[3] }
    }

    #[wasm_bindgen]
    pub struct CCImage {
        pub width: usize,
        pub palette: [u8],
        pub pix_data: [u8],
    }

    impl CCImage {
        pub fn new() -> Self {
            CCImage { width: 0, palette: vec![], pix_data: vec![] }
        }
    }

    pub fn process_image(img: DynamicImage) {
        let pix_orig = img.pixels().map(|p| color_conv(p.2)).collect::<Vec<_>>();

        let (pal, pix) = convert_to_indexed(
            &pix_orig,
            img.width() as usize,
            16,
            &KMeans,
            &ditherer::FloydSteinberg::new(),
        );
    }

    #[wasm_bindgen]
    pub fn render_bytes(image_bytes: &[u8]) -> Result<CCImage, JsValue> {
        let img = image::load_from_memory(image_bytes).map_err(|_| "failed to load image")?;

        return Ok(
            CCImage::new()
        )
    }
}

#[wasm_bindgen]
pub async fn load_data_from_url(url: &str) -> Result<String, JsValue> {
    utils::set_panic_hook();

    let res = reqwest::get(url).await;

    match res {
        Ok(v) => {
            let b = base64::encode_config(v.bytes().await.unwrap(), base64::STANDARD);

            Ok(format!("data:text/html;base64,{}", b))
        }
        Err(e) => Err(e.to_string().into()),
    }
}
