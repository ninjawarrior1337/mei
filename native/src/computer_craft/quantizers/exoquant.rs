use exoquant::{convert_to_indexed, ditherer, optimizer::KMeans};

use crate::computer_craft::CCImage;

use super::Quantizer;

pub struct Exoquant;

impl Exoquant {
    pub fn new() -> Exoquant {
        Exoquant{}
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
    ) -> crate::computer_craft::CCImage {
        let resized = img
            .resize_exact(nwidth, nheight, image::imageops::FilterType::Nearest)
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
            width: resized.width() as usize,
            palette: pal_new,
            pix_data: pix,
        };
    }
}
