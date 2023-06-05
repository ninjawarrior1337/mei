use bitvec::prelude::*;

const PREC: i32 = 10;

#[derive(Default)]
struct State {
    q: i32,
    s: i32,
    lt: i32,
}

impl State {
    fn new() -> State {
        State {
            q: 0,
            s: 0,
            lt: -128
        }
    }
}

struct Encoder<T>
where T: Iterator<Item = i8> {
    pcm: T,
    state: State,
}

impl<T> From<T> for Encoder<T>
where T: Iterator<Item = i8> {
    fn from(value: T) -> Self {
        Encoder {
            state: State::new(),
            pcm: value,
        }
    }
}

impl<T> Iterator for Encoder<T> 
where T: Iterator<Item = i8> {
    type Item = u8;

    fn next(&mut self) -> Option<Self::Item> {
        let state = &mut self.state;
        // This is a line for line translation of the reference implementation.
        let mut d = 0;

        let sample = (&mut self.pcm).take(8).collect::<Vec<_>>();

        if sample.len() > 0 {
            for smpl in sample {
                // set bit / target
                let t = if (smpl as i32) < state.q || smpl == -128 { -128 } else {127};
                d >>= 1;
                if t > 0 {
                    d |= 0x80;
                }
    
                // adjust charge
                let mut nq = state.q + ((state.s * (t-state.q) + (1<<PREC-1))) >> PREC;
                if nq == state.q && nq != t {
                    nq += if t == 127 {
                        1
                    } else {
                        -1
                    };
                }
    
                state.q = nq;
    
                //adjust strength
                let st: i32 = if t != state.lt {
                    0
                } else {
                    (1<<PREC)-1
                };
                let mut ns = state.s;
                if ns != st {
                    ns += if st != 0 {
                        1
                    } else {
                        -1
                    };
                }
    
                if PREC > 8 {
                    if ns < 1+(1<<(PREC-8)) {
                        ns = 1+(1<<(PREC-8))
                    }
                }
    
                state.s = ns;

                state.lt = t;
            }

            return Some(d)
        } else {
            return None
        }
    }
}

#[cfg(test)]
mod tests {
    use std::{fs::File, io::{Read, BufReader, Write}, fmt::format};
    use super::*;

    #[test]
    fn file() {
        let f = File::open("bocchi.raw").unwrap();
        let mut of = File::create("bocchi.dfpwm").unwrap();
        let reader = BufReader::new(f);
        let i = reader.bytes().filter_map(|f| f.ok()).map(|b| b as i8);

        let e = Encoder::from(i);

        // println!("{:?}", e.take(8).map(|f| format!("{:02x}", f)).collect::<Vec<_>>());
        let bv = e.collect::<Vec<_>>();

        of.write(&bv);
    }
}