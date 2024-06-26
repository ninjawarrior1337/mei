import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "~/server/trpc/router";


function getBaseUrl() {
    if (typeof window !== 'undefined')
      // browser should use relative path
      return '';
    if (import.meta.env.VERCEL_URL)
      // reference for vercel.com
      return `https://${process.env.VERCEL_URL}`;
    if (import.meta.env.RENDER_INTERNAL_HOSTNAME)
      // reference for render.com
      return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
    // assume localhost
    return `http://localhost:${import.meta.env.PORT ?? 3000}`;
  }

export const trpc = createTRPCProxyClient<AppRouter>({
    links: [
        httpBatchLink({
            url: `${getBaseUrl()}/api/trpc`,
        })
    ]
})
