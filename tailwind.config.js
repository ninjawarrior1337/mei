/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx,astro,vue,svelte}",
  ],
  theme: {
    extend: {
        colors: {
            muse: "#e4007f",
            aqours: "#009fe8",
            niji: "#fab920",
            liella: "#8b4993",
            treelar: "#3399ff"
        },
    },
  },
  plugins: [],
}

