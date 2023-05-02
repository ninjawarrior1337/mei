import { inferAsyncReturnType } from '@trpc/server';
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { Tokubetsu } from "~/tokubetsu"
import { useNativeCode } from '~/mei_native';

interface CreateInnerContextOptions extends Partial<FetchCreateContextFnOptions> {}

export async function createContextInner(opts?: CreateInnerContextOptions) {
    const tokubetsu = new Tokubetsu()
    const native = await useNativeCode()
    tokubetsu.setup()
    return {
        native,
        tokubetsu
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

export type Context = inferAsyncReturnType<typeof createContext>;