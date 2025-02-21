import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        globals: true,
        include: ["src/tests/**/*.test.ts", "src/tests/**/*.spec.ts"],
        coverage: {
            provider: "v8"
        }
    }
});
