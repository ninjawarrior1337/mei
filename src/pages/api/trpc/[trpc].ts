import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { APIRoute } from 'astro';
import { createContext } from "~/server/trpc/context";
import { appRouter } from '~/server/trpc/router';

export const ALL: APIRoute = (opts) => {
    const CORS = {
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
        "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    }
    if (opts.request.method === 'OPTIONS') {
        return new Response(null, {
            status: 200,
            headers: {
                ...CORS
            }
        })
    }
    return fetchRequestHandler({
        router: appRouter,
        createContext,
        endpoint: "/api/trpc",
        req: opts.request,
        responseMeta(opts) {
            return {
                headers: {
                    ...CORS,
                },
            }
        }
    })
}