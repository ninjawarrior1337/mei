export const config = {
    runtime: "experimental-edge"
}

export default (req: Request) => new Response(`Hello from ${req.url}`)