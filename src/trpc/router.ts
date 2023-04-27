import { initTRPC } from '@trpc/server';
import { Context } from './context';
import { tokubetsuRouter } from './tokubetsu';

export const t = initTRPC.context<Context>().create();

export const appRouter = t.router({
  hello: t.procedure.query(() => {
    return "world"
  }),
  tokubetsu: tokubetsuRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;