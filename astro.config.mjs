import { defineConfig } from 'astro/config';
import cloudflare from "@astrojs/cloudflare"
import vue from "@astrojs/vue"
import tailwindcss from "@tailwindcss/vite"

import wasm from 'vite-plugin-wasm';

export default defineConfig({
  integrations: [vue()],
  output: "server",
  adapter: cloudflare(),
  vite: {
    plugins: [
      tailwindcss(),
      wasm()
    ]
  }
});