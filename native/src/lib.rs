mod utils;

use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
pub fn add(a: i32, b: i32) -> i32 {
    a+b
}

#[wasm_bindgen]
pub async fn load_data_from_url(url: &str) -> Result<String, JsValue> {
    utils::set_panic_hook();

    let res = reqwest::get(url).await;

    match res {
        Ok(v) => {
            let b = base64::encode_config(v.bytes().await.unwrap(), base64::STANDARD);

            Ok(format!("data:text/html;base64,{}", b))
        },
        Err(e) => Err(e.to_string().into())
    }
}