pub mod quantizers;
pub mod serializers;
pub mod dfpwm;

use image::DynamicImage;

use self::{quantizers::{Quantizer}, serializers::CCImageSerializer};

#[derive(Debug)]
/// An intermediary representation of a ComputerCraft image.
pub struct CCImage {
    pub width: u32,
    pub height: u32,
    /// The palette of the image, as an array of 16 24-bit RGB values.
    pub palette: Vec<u32>,
    /// The pixel data of the image, as an array of 8-bit indices into the palette.
    pub pix_data: Vec<u8>,
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