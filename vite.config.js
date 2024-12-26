import { defineConfig } from "vite";
import obfuscatorPlugin from "vite-plugin-javascript-obfuscator";

export default defineConfig({
  base: /PersonalBio/,
  plugins: [
    obfuscatorPlugin({
      exclude: [/node_modules/, "src/repository/key.dev.js"],
      debugger: true,
    }),
  ],
});
