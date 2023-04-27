import { inferAsyncReturnType } from '@trpc/server';
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { Env } from '../main';
import { Tokubetsu } from '../tokubetsu';

interface CreateInnerContextOptions extends Partial<FetchCreateContextFnOptions> {
    env: Env,
}

export async function createContextInner(opts?: CreateInnerContextOptions) {
    const tokubetsu = new Tokubetsu()
    tokubetsu.setup()
    return {
        env: opts?.env,
        tokubetsu
    }
}

export function createContext({
    req,
    resHeaders
}: FetchCreateContextFnOptions, env: Env) {
    const innerContext = createContextInner({env})
    return {
        ...innerContext,
        req,
        resHeaders
    }
}

export type Context = inferAsyncReturnType<typeof createContext>;