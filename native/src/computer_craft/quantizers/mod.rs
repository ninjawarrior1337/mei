use image::DynamicImage;

use super::CCImage;

pub mod exoquant;
pub mod imagequant;

pub trait Quantizer {
    fn quantize(&self, img: DynamicImage, nwidth: u32, nheight: u32) -> CCImage;
}

impl From<&str> for Box<dyn Quantizer> {
    fn from(s: &str) -> Self {
        match s.as_ref() {
            "exoquant" => Box::new(exoquant::Exoquant::new()),
            "imagequant" => Box::new(imagequant::ImageQuant::new_with_opts(
                Some(10),
                Some(image::imageops::FilterType::Triangle),
            )),
            _ => panic!("invalid quantizer"),
        }
    }
}
