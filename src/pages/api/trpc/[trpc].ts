import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { NextRequest } from 'next/server';
import { createContext } from '~/trpc/context';
import { appRouter } from '~/trpc/router';

export const config = {
    runtime: 'edge',
}

export default async function handler(req: NextRequest) {
    return fetchRequestHandler({
        endpoint: '/api/trpc',
        router: appRouter,
        req,
        createContext,
        responseMeta(opts) {
            const ONE_HOUR_IN_SECONDS = 60 * 60;
            const ONE_DAY_IN_SECONDS = ONE_HOUR_IN_SECONDS * 24;
            return {
                headers: {
                    'cache-control': `s-maxage=${ONE_HOUR_IN_SECONDS}, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`,
                },
            }
        }
    });
}