import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import copy from "rollup-plugin-copy"; //引入插件
import vitePluginImp from "vite-plugin-imp";

import * as path from "path";

// const { NODE_ENV } = process.env;
// console.log("process.env.", NODE_ENV);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePluginImp({
      libList: [
        {
          libName: "antd",
        },
      ],
    }),
  ],
  server: {
    port: 4000,
  },
  base: "./",

  css: {
    preprocessorOptions: {
      // 支持less
      less: {
        javascriptEnabled: true,
      },
    },
  },

  build: {
    outDir: "dist/src",
    // sourcemap: NODE_ENV === "development",
    rollupOptions: {
      input: {
        // contentJs: path.resolve(__dirname, "./src/contentJs.ts"),
        index: path.resolve(__dirname, "./index.html"),
        background: path.resolve(__dirname, "./src/background.ts"),
        contentScript: path.resolve(__dirname, "./src/contentScript.ts"),
        // manifest: path.resolve(__dirname, "./manifest.json"),
      },
      output: {
        entryFileNames: "[name].js",
      },
      plugins: [
        copy({
          targets: [
            {
              src: "./manifest.json",
              dest: "./dist",
              // transform: (contents, filename) =>
              //   contents.toString().replace(/\.\/dist\//g, "./"), // ./dist/ => ./
            }, //执行拷贝
            {
              src: "./src/assets",
              dest: "./dist/src",
            }, //执行拷贝
          ],
        }),
      ],
    },
  },
});
