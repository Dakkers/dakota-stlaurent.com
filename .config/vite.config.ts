import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import { devtools } from "@tanstack/devtools-vite";

import { tanstackStart } from "@tanstack/react-start/plugin/vite";

import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { cloudflare } from "@cloudflare/vite-plugin";

const config = defineConfig({
  root: fileURLToPath(new URL("..", import.meta.url)),
  envDir: fileURLToPath(new URL(".", import.meta.url)),
  resolve: { tsconfigPaths: true },
  plugins: [
    devtools(),
    tanstackStart(),
    cloudflare({
      viteEnvironment: { name: "ssr" },
      configPath: fileURLToPath(new URL("wrangler.jsonc", import.meta.url)),
    }),
    tailwindcss(),
    viteReact(),
  ],
});

export default config;
