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

app.get("/cc/image", render_image)

app.get("/wasm/add/:a/:b", async (c) => {
    let a = parseInt(c.req.param("a"))
    let b = parseInt(c.req.param("b"))

    const native = await useNativeCode()

    return c.text(native.add(a, b).toString())
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