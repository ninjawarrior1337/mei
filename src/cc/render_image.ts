import { Handler } from "hono"
import * as iq from "image-q"


export const handler: Handler = async (c) => {
    return c.json("aa")
}