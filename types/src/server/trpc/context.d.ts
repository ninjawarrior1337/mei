import { inferAsyncReturnType } from '@trpc/server';
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { Tokubetsu } from "~/tokubetsu";
interface CreateInnerContextOptions extends Partial<FetchCreateContextFnOptions> {
}
export declare function createContextInner(opts?: CreateInnerContextOptions): Promise<{
    native: typeof import("native/pkg/mei_native");
    tokubetsu: Tokubetsu;
}>;
export declare function createContext({ req }: FetchCreateContextFnOptions): Promise<{
    req: Request;
    native: typeof import("native/pkg/mei_native");
    tokubetsu: Tokubetsu;
}>;
export type Context = inferAsyncReturnType<typeof createContext>;
export {};
