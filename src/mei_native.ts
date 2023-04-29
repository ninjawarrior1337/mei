// import wasm from "../native/pkg/mei_native_bg.wasm"
import * as pkg from "../native/pkg"

export const useNativeCode = async () => {
    await pkg.default("https://fs.treelar.xyz/mei/mei_native_bg.wasm")

    return pkg
}