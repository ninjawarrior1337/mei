use std::{
    fs::{self, File},
    io::Write,
};

use indicatif::{ParallelProgressIterator, ProgressStyle};
use rayon::prelude::*;

use mei_native::computer_craft::{
    quantizers::{
        imagequant::{self, ImageQuant},
        Quantizer,
    },
    serializers::{self, rawmode::RawModeSerializer, CCImageSerializer},
};

fn main() {
    let paths = fs::read_dir("./frame_data/bocchi").unwrap();

    const WIDTH: u32 = 51;
    const HEIGHT: u32 = 19;
    const FPS: f32 = 23.98;

    let mut file = File::create("./bocchi.32").unwrap();

    write!(file, "32Vid 1.1\n").unwrap();
    write!(file, "{}\n", FPS).unwrap();

    let frames: Vec<String> = paths
        .collect::<Vec<_>>()
        .par_iter()
        .progress()
        .filter_map(|p| p.as_ref().ok())
        .map(|d| {
            let img = image::open(d.path()).unwrap();
            let cc = Quantizer::quantize(
                &ImageQuant::new_with_opts(Some(10), Some(image::imageops::FilterType::Nearest)),
                img,
                WIDTH,
                HEIGHT,
            );
            let out = CCImageSerializer::serialize(&RawModeSerializer, &cc);
            String::from_utf8_lossy(out.as_slice()).to_string()
        })
        .collect();

    frames.iter().for_each(|frame| {
        write!(file, "{}", frame).unwrap();
    });
}
