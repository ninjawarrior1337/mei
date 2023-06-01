use std::{
    fs::{self, File},
    io::Write,
};

use indicatif::{ParallelProgressIterator, ProgressIterator, ProgressStyle};
use rayon::prelude::*;

use mei_native::computer_craft::{
    quantizers::{
        imagequant::{self, ImageQuant},
        Quantizer,
    },
    serializers::{self, rawmode::RawModePacketSerializer, CCImageSerializer, bimg::BimgSerializer}, ImageRenderer,
};

const WIDTH: u32 = 51;
const HEIGHT: u32 = 19;
const FPS: f32 = 23.98;

fn write_rawmode() {
    let paths = fs::read_dir("./frame_data/bocchi").unwrap();

    let mut file = File::create("./bocchi.32").unwrap();

    write!(file, "32Vid 1.1\n").unwrap();
    write!(file, "{}\n", FPS).unwrap();

    let frames: Vec<Vec<u8>> = paths
        .collect::<Vec<_>>()
        .par_iter()
        .progress()
        .filter_map(|p| p.as_ref().ok())
        .map(|d| {
            let i = image::open(d.path()).unwrap();
            ImageRenderer::new(WIDTH, HEIGHT)
                .image(i)
                .quantizer(ImageQuant::new_with_opts(Some(10), Some(image::imageops::FilterType::Nearest)))
                .serializer(RawModePacketSerializer)
                .render()
        })
        .collect();

    frames.iter().for_each(|frame| {
        file.write(frame).unwrap();
    });
}

fn write_bimg() {
    let paths = fs::read_dir("./frame_data/bocchi").unwrap();

    let mut file = File::create("./bocchi.bimg").unwrap();

    write!(file, "{{\n").unwrap();

    let frames: Vec<Vec<u8>> = paths
        .take(20)
        .collect::<Vec<_>>()
        .par_iter()
        .progress()
        .filter_map(|p| p.as_ref().ok())
        .map(|d| {
            let img = image::open(d.path()).unwrap();
            ImageRenderer::new(WIDTH, HEIGHT)
                .image(img)
                .quantizer(ImageQuant::new_with_opts(Some(10), Some(image::imageops::FilterType::Nearest)))
                .serializer(BimgSerializer)
                .render()
        })
        .collect();

    let frames = frames.iter()
        .filter_map(|f| String::from_utf8(f.to_vec()).ok())
        .collect::<Vec<String>>().join(",\n");

    write!(&mut file, "{},\n", frames).unwrap();
    write!(file, "animation = true,\n").unwrap();
    write!(file, "secondsPerFrame = {},\n", 1.0 / FPS).unwrap();
    write!(file, "}}").unwrap();
}

fn main() {
    write_rawmode();
    // write_bimg();
}
