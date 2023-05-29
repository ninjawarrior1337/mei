use criterion::{criterion_group, criterion_main, Criterion};
use image::imageops::FilterType;
use mei_native::computer_craft::craftos::render_frame;
use mei_native::computer_craft::quantizers::{exoquant, imagequant};

fn raw_bocchi_bench(c: &mut Criterion) {
    let image_data = image::open("./frame_data/bocchi/test.jpeg").unwrap();
    c.bench_function("raw_bocchi exo", |b| {
        b.iter(|| render_frame(image_data.clone(), 51, 19, exoquant::Exoquant));
    });

    c.bench_function("raw_bocchi imagequant", |b| {
        b.iter(|| {
            render_frame(
                image_data.clone(),
                51,
                19,
                imagequant::ImageQuant::new_with_opts(Some(10), None),
            )
        })
    });
}

criterion_group!(benches, raw_bocchi_bench);
criterion_main!(benches);
