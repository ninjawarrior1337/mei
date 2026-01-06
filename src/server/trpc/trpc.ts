import { initTRPC } from '@trpc/server';
import type { Context } from './context';
// import type { OpenApiMeta } from 'trpc-to-openapi';

export const t = initTRPC.context<Context>().create();
export const router = t.router
export const procedure = t.procedure