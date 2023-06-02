use exoquant::{convert_to_indexed, ditherer, optimizer::KMeans};
use image::imageops::FilterType::{self, Nearest};

use crate::CCImage;

use super::Quantizer;

pub struct Exoquant {
    resize_strategy: FilterType
}

impl Exoquant {
    pub fn new() -> Exoquant {
        Self::new_with_opts(None)
    }
    pub fn new_with_opts(resize: Option<FilterType>) -> Exoquant {
        Exoquant{
            resize_strategy: resize.unwrap_or(Nearest)
        }
    }
    fn color_conv(c: &image::Rgb<u8>) -> exoquant::Color {
        exoquant::Color {
            r: c.0[0],
            g: c.0[1],
            b: c.0[2],
            a: 255,
        }
    }
}

impl Quantizer for Exoquant {
    fn quantize(
        &self,
        img: image::DynamicImage,
        nwidth: u32,
        nheight: u32,
    ) -> crate::CCImage {
        let resized = img
            .resize_exact(nwidth, nheight, self.resize_strategy)
            .to_rgb8();

        let pix_orig = resized
            .pixels()
            .map(|p| Self::color_conv(p))
            .collect::<Vec<_>>();

        let (pal, pix) = convert_to_indexed(
            &pix_orig,
            img.width() as usize,
            16,
            &KMeans,
            &ditherer::FloydSteinberg::new(),
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
            width: nwidth,
            height: nheight,
            palette: pal_new,
            pix_data: pix,
        };
    }
}
