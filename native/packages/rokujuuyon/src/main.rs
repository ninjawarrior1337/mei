use std::{
    fs::{self, File},
    io::{Write, stdin, Read, Cursor, BufReader, BufRead}, os::unix::prelude::FileExt, thread::spawn, sync::{Arc, Mutex}, collections::BinaryHeap, cmp::Reverse, path::PathBuf,
};

use clap::{Parser, Subcommand};

use crossbeam_channel::unbounded;
use image::{ImageFormat, DynamicImage};
use indicatif::{ParallelProgressIterator, ProgressIterator};
use rayon::prelude::*;

use rokujuuyon::{
    quantizers::{
        imagequant::{ImageQuant},
    },
    serializers::{rawmode::RawModePacketSerializer, bimg::BimgSerializer}, ImageRenderer,
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

fn stdin_parser() {
    let mut f = File::create("bocchi_ffmpeg.32").unwrap();

    write!(f, "32Vid 1.1\n").unwrap();
    write!(f, "23.81\n").unwrap();
   
    let (tx, rx) = unbounded::<(u32, DynamicImage)>();

    spawn(move || {
        let i = stdin();
        let mut reader = BufReader::new(i);

        let mut frame = 0;
        while reader.fill_buf().map(|v| !v.is_empty()).unwrap() {
            let mut img_buf = image::RgbImage::new(1280, 720);

            let p = img_buf.pixels_mut();
            p.for_each(|p| {
                let mut pix_buf = [0u8; 3];
                reader.read_exact(&mut pix_buf).unwrap();
                p.0 = pix_buf
            });

            tx.send((frame, img_buf.into())).unwrap();
            frame+=1;
        }
    });

    let mut workers = vec![];
    let frames = Arc::new(Mutex::new(BinaryHeap::new()));

    for _ in 0..num_cpus::get() {
        let r = rx.clone();
        let fw = frames.clone();
        let wk = spawn(move || {
            for (idx, img) in r.iter() {
                let o = ImageRenderer::new(51, 19)
                    .image(img)
                    .quantizer(ImageQuant::new_with_opts(Some(10), Some(image::imageops::FilterType::Nearest)))
                    .serializer(RawModePacketSerializer)
                    .render();
                fw.lock().unwrap().push(Reverse((idx, o)));
            }
        });
        workers.push(wk);
    }

    for worker in workers {
        let _ = worker.join();
    }

    while let Some(v) = frames.lock().unwrap().pop() {
        f.write(&v.0.1).unwrap();
    } 
}

#[derive(Parser)]
#[command(author, version)]
struct Args {
    #[command(subcommand)]
    command: Commands,
}

#[derive(Subcommand)]
enum Commands {
    /// Read image data from stdin in the form of a stream of 24 bit RGB values
    Stdin {
        #[arg(long = "iw")]
        input_width: u32,

        #[arg(long = "ih")]
        input_height: u32,

        #[arg(long = "ow", default_value_t = 51)]
        output_width: u32,

        #[arg(long = "oh", default_value_t = 19)]
        output_height: u32,

        #[arg(long, short)]
        animation: bool,

        #[arg(long, short, required_if_eq("animation", "true"))]
        fps: Option<u32>
    },

    /// Read image data from a single file 
    File {
        #[arg(short, long)]
        input: PathBuf,

        #[arg(long, short)]
        output: PathBuf,
    },

    Folder {
        #[arg(short, long)]
        input: PathBuf,

        #[arg(long, short)]
        fps: Option<u32>,

        #[arg(long, short)]
        output: PathBuf,
    }
}

fn main() {
    let cli = Args::parse();

    // write_rawmode();
    // write_bimg();
}
