import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import vercel from "@astrojs/vercel/serverless"
import wasm from "vite-plugin-wasm"
import topLevelAwait from "vite-plugin-top-level-await"

export default defineConfig({
  integrations: [tailwind()],
  output: "server",
  adapter: vercel(),
  vite: {
    plugins: [
      wasm(),
      // topLevelAwait()
    ]
  }
});