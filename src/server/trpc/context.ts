import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { Tokubetsu } from "~/tokubetsu"
import { useNativeCode } from '~/mei_native';

interface CreateInnerContextOptions extends Partial<FetchCreateContextFnOptions> {}

export async function createContextInner(opts?: CreateInnerContextOptions) {
    const tokubetsu = new Tokubetsu()
    const native = await useNativeCode()
    return {
        native,
        tokubetsu,
    }
}

export async function createContext({
    req
}: FetchCreateContextFnOptions) {
    const innerContext = await createContextInner()
    return {
        ...innerContext,
        req,
    }
}

export type Context = Awaited<ReturnType<typeof createContext>>;