import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@neoloop-ds": resolve(__dirname, "src"),
      "@tokens": resolve(__dirname, "src/tokens"),
      "@atoms": resolve(__dirname, "src/atoms"),
      "@molecules": resolve(__dirname, "src/molecules"),
      "@organisms": resolve(__dirname, "src/organisms"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/lib/test-setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      thresholds: {
        branches: 90,
        functions: 90,
        lines: 90,
        statements: 90,
      },
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/**/*.test.{ts,tsx}",
        "src/**/*.stories.{ts,tsx}",
        "src/lib/test-setup.ts",
        "src/lib/test-utils.ts",
        "src/index.ts",
        "src/**/index.ts",
      ],
    },
  },
});
