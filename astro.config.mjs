import { defineConfig } from 'astro/config';
import vercel from "@astrojs/vercel"
import vue from "@astrojs/vue"
import tailwindcss from "@tailwindcss/vite"

import wasm from 'vite-plugin-wasm';

export default defineConfig({
  integrations: [vue()],
  output: "server",
  adapter: vercel(),
  vite: {
    plugins: [
      tailwindcss(),
      wasm()
    ]
  }
});