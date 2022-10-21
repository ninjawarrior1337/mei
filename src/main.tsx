import { Hono } from "hono";
import { LLUtils } from "./LoveLive";
import { SSR } from "./twitch";

import {jsx} from "hono/jsx"
import {cors} from "hono/cors"
import { handler as render_image } from "./cc/render_image";

import {useNativeCode} from "./mei_native"

interface Env {

}

const app = new Hono()

app.use("/*", cors({
    origin: "*"
}))

app.get("/", async (c) => {
    return c.html(<SSR cf={c.req.cf}></SSR>)
})

app.get("/idol", async (c) => {
    await LLUtils.setup()
    return c.json(LLUtils.getBirthdayIdol())
})

app.get("/cc/img/:width/:height", async (c) => {
    let w = parseInt(c.req.param("width"))
    let h = parseInt(c.req.param("height"))

    const native = await useNativeCode()

    try {
        const res = await fetch("https://s.pacn.ws/1500/10q/love-live-sunshine-nesoberi-plush-hanamaru-kunikida-fantastic-de-661227.1.jpg?v=qoaxm4&width=1500")
        const view = new Uint8Array(await res.arrayBuffer())
        const img = native.render_bytes(view, w, h)

        let width = img.width
        let palette_map: Map<number, number> = new Map()

        for(let [k, v] of img.palette.entries()) {
            palette_map.set(1 << k, v)
        }
        let palette = Object.fromEntries(palette_map)

        let pixels = Object.values(img.pix_data).map((v) => 1 << v)

        console.log(pixels.length)

        return c.json({width, palette, pixels})
    } catch (e) {
        return c.json(e)
    }
})

app.get("/wasm/get/:url", async (c) => {
    const native = await useNativeCode()

    return native.load_data_from_url(`https://${c.req.param("url")}`)
        .then(r => {
            return c.html(
                <iframe style="width: 100%; height: 100%;" src={r}></iframe>
            )
        }, r => {
            return c.text(r)
        })
})

app.get("/ws", async ({req}) => {
    const upgradeHeader = req.headers.get("Upgrade")
    if(!upgradeHeader || upgradeHeader !== "websocket") {
        return new Response('Expected Upgrade: websocket', { status: 426 })
    }

    const [client, server] = Object.values(new WebSocketPair())
    server.accept()

    server.addEventListener("message", (m) => {
        console.log(m.data)
        server.send(m.data)
    })

    return new Response(null, {
        status: 101,
        webSocket: client
    })
})


export default app