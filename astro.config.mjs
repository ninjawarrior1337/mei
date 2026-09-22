import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import vue from "@astrojs/vue";
import tailwindcss from "@tailwindcss/vite";
import wasm from "vite-plugin-wasm";

export default defineConfig({
  output: "server",
  integrations: [vue()],
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss(), wasm()],
  },
});
