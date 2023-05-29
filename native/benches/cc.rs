use criterion::{criterion_group, criterion_main, Criterion};
use mei_native::computer_craft::quantizers::{exoquant, imagequant, Quantizer};

fn raw_bocchi_bench(c: &mut Criterion) {
    let image_data = image::open("./frame_data/bocchi/frame-0015.jpg").unwrap();
    c.bench_function("raw_bocchi exo", |b| {
        b.iter(|| {
            Quantizer::quantize(
                &exoquant::Exoquant::new(),
                image_data.clone(),
                51,
                19,
            )
        });
    });

    c.bench_function("raw_bocchi imagequant", |b| {
        b.iter(|| {
            Quantizer::quantize(
                &imagequant::ImageQuant::new_with_opts(
                    Some(10),
                    Some(image::imageops::FilterType::Nearest),
                ),
                image_data.clone(),
                51,
                19,
            )
        })
    });
}

criterion_group!(benches, raw_bocchi_bench);
criterion_main!(benches);
