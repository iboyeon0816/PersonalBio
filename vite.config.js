import { defineConfig } from "vite";
import obfuscatorPlugin from "vite-plugin-javascript-obfuscator";

export default defineConfig(({ command, mode }) => {
  let baseUrl =
    command == "serve" || mode == "development" ? "/" : "/PersonalBio";
  return {
    base: baseUrl,
    plugins: [
      obfuscatorPlugin({
        exclude: [/node_modules/],
        debugger: true,
      }),
    ],
  };
});
