import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import copy from "rollup-plugin-copy";
import livereload from "rollup-plugin-livereload";
import svelte from "rollup-plugin-svelte";
import { terser } from "rollup-plugin-terser";
import sveltePreprocess from "svelte-preprocess";
import scss from "rollup-plugin-scss";

const production = !process.env.ROLLUP_WATCH;

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = require("child_process").spawn(
        "npm",
        ["run", "start", "--", "--dev"],
        {
          stdio: ["ignore", "inherit", "inherit"],
          shell: true,
        }
      );

      process.on("SIGTERM", toExit);
      process.on("exit", toExit);
    },
  };
}

export default {
  input: "src/main.ts",
  output: {
    format: "iife",
    sourcemap: !production,
    name: "app",
    file: "dist/bundle.js",
  },

  plugins: [
    svelte({
      compilerOptions: {
        dev: !production,
      },
      emitCss: true,
      preprocess: sveltePreprocess(),
    }),
    scss({
      output: true,
      outputStyle: !production ? "expanded" : "compressed",
    }),
    resolve({
      browser: true,
      dedupe: ["svelte"],
    }),
    commonjs(),
    production && terser(),
    typescript({
      sourceMap: !production,
      inlineSources: !production,
    }),
    copy({
      targets: [{ src: "public/*", dest: "dist" }],
    }),
    !production && serve(),
    !production && livereload("dist"),
  ],
};
