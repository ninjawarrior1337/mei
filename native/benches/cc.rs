use criterion::{criterion_group, criterion_main, Criterion};
use mei_native::computer_craft::{quantizers::{exoquant::{self, Exoquant}, imagequant::{self, ImageQuant}, Quantizer}, ImageRenderer, serializers::rawmode::RawModePacketSerializer};

fn raw_bocchi_bench(c: &mut Criterion) {
    let image_data = image::open("./frame_data/bocchi/frame-0015.jpg").unwrap();
    c.bench_function("raw_bocchi exo", |b| {
        b.iter(|| {
            ImageRenderer::new(51, 19)
                .image(image_data.clone())
                .quantizer(Exoquant::new())
                .serializer(RawModePacketSerializer)
                .render()
        });
    });

    c.bench_function("raw_bocchi imagequant", |b| {
        b.iter(|| {
            ImageRenderer::new(51, 19)
                .image(image_data.clone())
                .quantizer(ImageQuant::new_with_opts(Some(10), None))
                .serializer(RawModePacketSerializer)
                .render()
        })
    });
}

criterion_group!(benches, raw_bocchi_bench);
criterion_main!(benches);
