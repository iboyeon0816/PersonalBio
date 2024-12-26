import { resolve } from "path";
import { defineConfig } from "vite";
import obfuscatorPlugin from "vite-plugin-javascript-obfuscator";

export default defineConfig(({ command, mode }) => {
  let baseUrl =
    command == "serve" || mode == "development" ? "/" : "/PersonalBio";
  return {
    base: baseUrl,
    root: "./src",
    build: {
      emptyOutDir: true,
      outDir: "../dist",
      rollupOptions: {
        input: {
          main: resolve(__dirname, "./src/index.html"),
          admin: resolve(__dirname, "./src/admin/index.html"),
        },
      },
    },
    plugins: [
      obfuscatorPlugin({
        exclude: [/node_modules/],
        debugger: true,
      }),
    ],
  };
});
