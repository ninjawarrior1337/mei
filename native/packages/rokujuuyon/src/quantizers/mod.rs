use image::DynamicImage;

use super::CCImage;

#[cfg(feature = "exoquant")]
pub mod exoquant;

#[cfg(feature = "imagequant")]
pub mod imagequant;

pub trait Quantizer {
    fn quantize(&self, img: DynamicImage, nwidth: u32, nheight: u32) -> CCImage;
}