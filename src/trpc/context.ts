import { inferAsyncReturnType } from '@trpc/server';
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { Env } from '../main';
import { Tokubetsu } from '../tokubetsu';
import { useNativeCode } from '../mei_native';

interface CreateInnerContextOptions extends Partial<FetchCreateContextFnOptions> {
    env: Env,
}

export async function createContextInner(opts?: CreateInnerContextOptions) {
    const tokubetsu = new Tokubetsu()
    const native = await useNativeCode()
    tokubetsu.setup()
    return {
        env: opts?.env,
        native,
        tokubetsu
    }
}

export async function createContext({
    req,
    resHeaders
}: FetchCreateContextFnOptions, env: Env) {
    const innerContext = await createContextInner({env})
    return {
        ...innerContext,
        req,
        resHeaders
    }
}

export type Context = inferAsyncReturnType<typeof createContext>;