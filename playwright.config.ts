import { defineConfig } from "@playwright/test";

export default defineConfig({
    webServer: {
        command: "npm run dev",
        url: "http://localhost:3009",
        timeout: 60 * 1000,
        reuseExistingServer: true
    },

    testDir: "src/e2e",
    testMatch: "**/*.test.ts"
});
