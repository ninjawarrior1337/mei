use std::{collections::BTreeMap, fmt::Write};

use rayon::vec;

use crate::computer_craft::CCImage;

use super::CCImageSerializer;

pub struct BimgSerializer;

impl BimgSerializer {
    fn write_palette(img: &CCImage, buf: &mut String) {
        buf.write_str("\tpalette = {\n").unwrap();
        // Block
        for (i, c) in img.palette.iter().enumerate() {
            let pal_str = format!("[{}] = {{ {:#08x} }},", i, c);
            buf.write_str("\t\t").unwrap();
            buf.write_str(&pal_str).unwrap();
            buf.write_str("\n").unwrap();
        }
        buf.write_str("\t},").unwrap();
    }    
}

impl CCImageSerializer for BimgSerializer {
    fn serialize(&self, img: &CCImage) -> Vec<u8> {
        let mut buf = String::new();
        
        buf.write_str("{\n").unwrap();
        Self::write_palette(img, &mut buf);
        img.pix_data.chunks(img.width as usize).for_each(|f| {
            // Lines
            buf.write_str("\t{\n").unwrap();

            buf.write_str(format!("\t\t\"{}\",\n", " ".repeat(img.width as usize)).as_str()).unwrap();

            let color_str = f.iter().map(|c| format!("{:x}", c)).collect::<Vec<String>>().join("");
            buf.write_str(format!("\t\t\"{}\",\n", color_str).as_str()).unwrap();
            buf.write_str(format!("\t\t\"{}\",\n", color_str).as_str()).unwrap();

            buf.write_str("\t},\n").unwrap();
        });
        buf.write_str("}").unwrap();

        buf.into()
    }
}