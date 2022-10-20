import { Hono } from "hono";
import { LLUtils } from "./LoveLive";
import { SSR } from "./twitch";

import {jsx} from "hono/jsx"
import {cors} from "hono/cors"

import {add} from "../native/pkg"
// import wasm from "../cc-conv/pkg/cc_conv_bg.wasm"

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

app.get("/wasm/add/:a/:b", async (c) => {
    let a = parseInt(c.req.param("a"))
    let b = parseInt(c.req.param("b"))

    return c.text(add(a, b).toString())
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