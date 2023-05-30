use image::DynamicImage;

use super::CCImage;

pub mod exoquant;
pub mod imagequant;

pub trait Quantizer {
    fn quantize(&self, img: DynamicImage, nwidth: u32, nheight: u32) -> CCImage;
}