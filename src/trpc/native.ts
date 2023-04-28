import { z } from "zod";
import { t } from "./trpc";

export const cc = t.router({
    render: t.procedure
        .input(z.object({
            url: z.string().url(),
            width: z.number().int().positive(),
            height: z.number().int().positive()
        }))
        .query(async ({input, ctx}) => {
            const res = await fetch(input.url)
            const data = new Uint8Array(await res.arrayBuffer())
            let ccImage =  ctx.native.cc.render(data, input.width, input.height)
            let width = input.width
            let palette_map: Map<number, number> = new Map()
            for(let [k, v] of ccImage.palette.entries()) {
                palette_map.set(1 << k, v)
            }
            let palette = Object.fromEntries(palette_map)
            let pixels = Object.values(ccImage.pix_data).map((v) => 1 << v)
            return {width, palette, pixels}
        })
})

export const hatsuon = t.router({
    render: t.procedure
        .input(z.object({
            str: z.string(),
            pitches: z.array(z.number().lt(256))
        }))
        .query(({input, ctx}) => {
            const pitches = new Uint8Array(input.pitches)
            const img = ctx.native.hatsuon.render(input.str, pitches)
            const base64String = btoa(String.fromCharCode(...img));
            const dataUrl = `data:image/png;base64,${base64String}`
            return dataUrl
        })
})