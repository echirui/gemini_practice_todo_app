import { reactRouter } from "@react-router/dev/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => ({
  plugins: [
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    tailwindcss(),
    mode !== 'test' && reactRouter(),
    tsconfigPaths(),
  ].filter(Boolean),
  server: {
    port: 8787,
  },
  test: {
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    exclude: ['node_modules', 'dist', '.idea', '.git', '.cache', 'e2e', 'workers'],
  },
}));
