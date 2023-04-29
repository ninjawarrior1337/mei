//@ts-ignore
import wasm from "../native/pkg/mei_native_bg.wasm?module"

import * as pkg from "../native/pkg"
export const useNativeCode = async () => {
    await pkg.default(wasm)

    return pkg
}