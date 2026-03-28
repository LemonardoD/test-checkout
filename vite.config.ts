import { defineConfig } from "vite";

export default defineConfig({
  esbuild: {
    jsxFactory: "h",
    jsxFragment: "Fragment",
  },
  build: {
    ssr: true,
    outDir: "dist",
    rollupOptions: {
      input: "src/index.tsx",
      output: {
        entryFileNames: "_worker.js",
        format: "es",
      },
    },
    minify: "esbuild",
    emptyOutDir: false,
  },
});
