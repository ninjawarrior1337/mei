pub mod rawmode;
pub mod bimg;

pub trait CCImageSerializer {
    fn serialize(&self, img: &super::CCImage) -> Vec<u8>;
}