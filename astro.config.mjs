import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from "@astrojs/vercel/serverless"
import vue from "@astrojs/vue"

import wasm from 'vite-plugin-wasm';

export default defineConfig({
  integrations: [vue(), tailwind()],
  output: "server",
  adapter: vercel(),
  vite: {
    plugins: [
      wasm()
    ]
  }
});