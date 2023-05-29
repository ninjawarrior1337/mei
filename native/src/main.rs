use std::{
    fs::{self, File},
    io::Write, path::PathBuf,
};

use indicatif::{ParallelProgressIterator};
use rayon::prelude::*;

use mei_native::computer_craft::{craftos::render_frame, quantizers::{exoquant, imagequant}};

fn main() {
    let paths = fs::read_dir("./frame_data/bocchi").unwrap();

    const WIDTH: u32 = 51;
    const HEIGHT: u32 = 19;
    const FPS: f32 = 0.0;

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
            render_frame(img, WIDTH, HEIGHT, imagequant::ImageQuant::new_with_opts(Some(10), None))
        })
        .collect();

    frames.iter().for_each(|frame| {
        write!(file, "{}", frame).unwrap();
    });
}
