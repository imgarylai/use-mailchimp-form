import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { resolve } from "path";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [
    dts({
      include: ["src/**/*"],
      exclude: ["**/*.test.*", "**/*.spec.*"],
    }),
  ],
  build: {
    lib: {
      entry: resolve(
        fileURLToPath(new URL(".", import.meta.url)),
        "src/index.ts"
      ),
      name: "UseMailChimpForm",
      formats: ["es", "cjs"],
      fileName: format => `index.${format === "es" ? "js" : "cjs"}`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
    sourcemap: true,
    minify: true,
    target: "es2020",
  },
});
