import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";
import viteReact from "@vitejs/plugin-react";

export default defineConfig({
  root: fileURLToPath(new URL("..", import.meta.url)),
  envDir: fileURLToPath(new URL(".", import.meta.url)),
  resolve: { tsconfigPaths: true },
  plugins: [viteReact()],
  test: { environment: "jsdom", passWithNoTests: true },
});
