import { sveltekit } from "@sveltejs/kit/vite";
import { svelteTesting } from "@testing-library/svelte/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [sveltekit(), svelteTesting(), tailwindcss()],
  cacheDir: './node_modules/.vite',
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest-setup.js"],
    exclude: ["tests/**", "node_modules/**"],
    forceRerunTriggers: ['**/package.json/**', '**/vitest.config.**', '**/vite.config.**'],
  },
} as Parameters<typeof defineConfig>[0] & { test: unknown });
