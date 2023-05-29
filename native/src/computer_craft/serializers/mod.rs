pub mod rawmode;

pub trait CCImageSerializer {
    fn serialize(&self, img: &super::CCImage) -> Vec<u8>;
}