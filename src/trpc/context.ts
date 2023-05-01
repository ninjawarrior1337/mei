import { inferAsyncReturnType } from '@trpc/server';
import { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { Tokubetsu } from '../tokubetsu';
import { useNativeCode } from '../mei_native';

interface CreateInnerContextOptions extends Partial<CreateNextContextOptions> {}

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
}: CreateNextContextOptions) {
    const innerContext = await createContextInner()
    return {
        ...innerContext,
        req,
    }
}

export type Context = inferAsyncReturnType<typeof createContext>;