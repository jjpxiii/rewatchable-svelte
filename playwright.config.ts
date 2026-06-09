import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  webServer: {
    command: "pnpm run dev -- --host 127.0.0.1 --port 4173",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
    env: {
      USE_FAKE_DATA: "1",
      PLAYWRIGHT: "1",
    },
  },
  use: {
    baseURL: "http://127.0.0.1:4173",
  },
});
