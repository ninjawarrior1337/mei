import { Hono } from "hono";
import { Tokubetsu } from "./tokubetsu";
import { SSR } from "./twitch";

import {jsx} from "hono/jsx"
import {cors} from "hono/cors"

import {useNativeCode} from "./mei_native"
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "./trpc/router";
import { createContext } from "./trpc/context";

export type Env = {
    mei_kv: KVNamespace
    DB: D1Database
}

const app = new Hono<{Bindings: Env}>()

app.use("/*", cors({
    origin: "*"
}))

app.get("/", async (c) => {
    return c.html(<SSR></SSR>)
})

const tokubetsu = new Hono<{"Variables": {
    tokubetsu: Tokubetsu
}}>()

tokubetsu.use("*", async (c, next) => {
    const tk = new Tokubetsu()
    tk.setup()
    c.set("tokubetsu", tk)
    await next()
})

tokubetsu.get("/", async (c) => {
    const tk = c.get("tokubetsu")
    return c.json(tk.getBirthdayIdol())
})

tokubetsu.get("/index", async (c) => {
    const tk = c.get("tokubetsu")
    c.pretty(true, 4)
    return c.json(tk.characters)
})

tokubetsu.get("/all", async (c) => {
    const tk = c.get("tokubetsu")
    c.pretty(true, 4)
    return c.json(tk.getBirthdayIdols())
})

app.route("/tokubetsu", tokubetsu)

app.all("/trpc/*", (ctx) => {
    return fetchRequestHandler({
        endpoint: "/trpc",
        req: ctx.req as unknown as Request,
        router: appRouter,
        createContext: (opts) => createContext(opts, ctx.env),
    })
})

// app.use("/cc/img/*", cache({cacheName: "mei-cc-img", cacheControl: "max-age=86400", wait: true}))
app.get("/cc/img/:width/:height", async (c) => {
    let w = parseInt(c.req.param("width"))
    let h = parseInt(c.req.param("height"))

    let img_url =  c.req.query("url")
    if(!img_url) {
        return c.text("please spcify an image url", 400)
    }

    try {
        const native = await useNativeCode()

        const res = await fetch(img_url)
        const view = new Uint8Array(await res.arrayBuffer())
        const img = native.render_bytes(view, w, h)

        let width = img.width
        let palette_map: Map<number, number> = new Map()

        for(let [k, v] of img.palette.entries()) {
            palette_map.set(1 << k, v)
        }
        let palette = Object.fromEntries(palette_map)

        let pixels = Object.values(img.pix_data).map((v) => 1 << v)

        return c.json({width, palette, pixels})
    } catch (e) {
        return c.json(e)
    }
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