import { t } from "./trpc"
import { tokubetsuRouter } from './tokubetsu';
import { cc, hatsuon } from './native';

export const appRouter = t.router({
  hello: t.procedure.query(() => {
    return "world"
  }),
  tokubetsu: tokubetsuRouter,
  hatsuon,
  cc
});

// export type definition of API
export type AppRouter = typeof appRouter;