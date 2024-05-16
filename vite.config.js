import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => ["circle-progress"].includes(tag),
        },
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src/client/", import.meta.url)),
    },
  },
});
