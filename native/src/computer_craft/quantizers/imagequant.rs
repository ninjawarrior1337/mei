use image::{GenericImageView, imageops::FilterType};
use imagequant::{Attributes, RGBA};

use crate::computer_craft::{quantizers::Quantizer, CCImage};

pub struct ImageQuant {
    speed: i32,
    resize_strategy: FilterType
}

impl ImageQuant {
    pub fn new() -> ImageQuant {
        Self::new_with_opts(None, None)
    }
    
    pub fn new_with_opts(speed: Option<i32>, resize: Option<FilterType>) -> ImageQuant {
        ImageQuant { speed: speed.unwrap_or(4), resize_strategy: resize.unwrap_or(FilterType::Nearest) }
    }    
}

impl Quantizer for ImageQuant {
    fn quantize(
        &self,
        img: image::DynamicImage,
        nwidth: u32,
        nheight: u32,
    ) -> crate::computer_craft::CCImage {
        let scaled_image = img.resize_exact(nwidth, nheight, self.resize_strategy);
        let pixels = scaled_image
            .pixels()
            .map(|p| RGBA::from(p.2.0))
            .collect::<Vec<_>>();

        let mut a = Attributes::new();

        let mut qt_img = a.new_image_borrowed(
            pixels.as_slice(),
            scaled_image.width() as usize,
            scaled_image.height() as usize,
            0.0,
        ).unwrap();

        a.set_max_colors(16).unwrap();
        a.set_speed(self.speed).unwrap();

        let mut qt_result = a.quantize(&mut qt_img).unwrap();
        let (pal, buf) = qt_result.remapped(&mut qt_img).unwrap();

        let pal = pal.iter().map(|c| {
            let rgb = c.rgb();
            let mut rgb_out = 0u32;
            rgb_out += (rgb.r as u32) << 16;
            rgb_out += (rgb.g as u32) << 8;
            rgb_out += rgb.b as u32;
            rgb_out
        }).collect::<Vec<u32>>();

        CCImage {
            width: nwidth,
            height: nheight,
            palette: pal,
            pix_data: buf
        }
    }
}
