use base64::{Engine as _, engine::general_purpose};
use bytes::{BytesMut, BufMut};
use image::DynamicImage;

use super::process_image;

#[derive(Copy, Clone, Debug)]
#[repr(u8)]
pub enum GfxMode {
    Text = 0,
    SixteenColor = 1,
    TwoFiftySixColor = 2,
}

trait PacketData {
    fn serialize(&self) -> String;
}

pub struct RawModePacket<'a> {
    /// MAGIC: !CPC for small form and !CPD for large
    magic: [u8; 4],
    /// Hexadecimal-encoded size of the Base64-encoded payload (in bytes) - up to 2^48-1 bytes (4 hex digits for small 12 hex digits for large)
    len: String,
    ///	Base64-encoded payload
    data: &'a dyn PacketData,
    /// Hexadecimal-encoded CRC32 checksum of encoded payload (8 bytes)
    checksum: String,
    /// New line/line feed character (ASCII code 10) - this MAY be preceded by a carriage return (ASCII code 13)
    end: u8
}

impl<'a> RawModePacket<'a> {
    fn new(data: &'a dyn PacketData) -> Self {
        let checksum = crc32fast::hash(data.serialize().as_bytes());
        RawModePacket {
            magic: *b"!CPC",
            len: format!("{:04x}", data.serialize().len()),
            data,
            checksum: format!("{:08x}", checksum),
            end: '\n' as u8
        }
    }
}

impl<'a> PacketData for RawModePacket<'a> {
    fn serialize(&self) -> String {
        let mut buf = BytesMut::new();
        buf.put_slice(&self.magic);
        buf.put_slice(&self.len.as_bytes());
        buf.put_slice(&self.data.serialize().as_bytes());
        buf.put_slice(&self.checksum.as_bytes());
        buf.put_u8(self.end);

        String::from_utf8_lossy(buf.as_ref()).to_string()
    }
}

pub struct TermContentsPacketData {
    mode: GfxMode,
    is_blinking: u8,
    width: u16,
    height: u16,
    cursor_x: [u8; 2],
    cursor_y: [u8; 2],
    grayscale: u8,
    reserved: [u8; 3], // 0x00 * 3
    data: TermData,
}

impl PacketData for TermContentsPacketData {
    fn serialize(&self) -> String {
        let mut buf = BytesMut::new();
        buf.put_slice(&[0, 0]); // 0x00 * 2
        buf.put_u8(self.mode as u8);
        buf.put_u8(self.is_blinking);
        buf.put_u16_le(self.width);
        buf.put_u16_le(self.height);
        buf.put_slice(&self.cursor_x);
        buf.put_slice(&self.cursor_y);
        buf.put_u8(self.grayscale);
        buf.put_slice(&self.reserved);

        let mut data_buf = BytesMut::new();
        data_buf.put_slice(&rle_encode(&self.data.pix_data_raw));
        data_buf.put_slice(&rle_encode(&self.data.background_pairs_raw));
        data_buf.put_slice(&self.data.palette);

        buf.put_slice(&data_buf);

        general_purpose::STANDARD.encode(&buf)
    }
}

#[derive(Debug)]
pub struct TermData {
    /// RLE-encoded text (length of expanded RLE = width * height)
    pix_data_raw: Vec<u8>,
    /// RLE-encoded background pairs (high nybble = BG, low nybble = FG)
    background_pairs_raw: Vec<u8>,
    /// 48-byte palette (16 colors, 3 bytes each)
    palette: [u8; 48],
}

fn rle_encode(arr: &[u8]) -> Vec<u8> {
    let mut out = Vec::new();
    let mut last = arr[0];
    let mut count = 0;

    for &i in arr {
        if i == last && count < 255 {
            count += 1;
        } else {
            out.push(last);
            out.push(count);
            last = i;
            count = 1;
        }
    }

    out.push(last);
    out.push(count);

    out
}

pub fn render_frame(image: DynamicImage, nwidth: u32, nheight: u32) -> String {
    let mut data = TermData {
        pix_data_raw: vec![' '.try_into().unwrap(); (nwidth * nheight) as usize],
        background_pairs_raw: vec![0; (nwidth * nheight) as usize],
        palette: [0; 48],
    };

    let img = process_image(image, nwidth, nheight);
    
    img.pix_data.iter().enumerate().for_each(|(i, c)| {
        data.background_pairs_raw[i] = c << 4;
        data.background_pairs_raw[i] += c & 0x0f;
    });

    img.palette.iter().enumerate().for_each(|(i, c)| {
        data.palette[i * 3] = (c >> 16) as u8;
        data.palette[i * 3 + 1] = (c >> 8) as u8;
        data.palette[i * 3 + 2] = (c & 0x0000ff) as u8;
    });

    let tdpd = TermContentsPacketData {
        mode: GfxMode::Text,
        is_blinking: 0,
        width: nwidth as u16,
        height: nheight as u16,
        cursor_x: [0, 0],
        cursor_y: [0, 0],
        grayscale: 0,
        reserved: [0; 3],
        data,
    };

    let packet = RawModePacket::new(&tdpd);

    packet.serialize()
}