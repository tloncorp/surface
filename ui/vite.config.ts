import { urbitPlugin } from "@urbit/vite-plugin-urbit";
import basicSsl from "@vitejs/plugin-basic-ssl";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import { BuildOptions, defineConfig, loadEnv } from "vite";
import packageJson from "./package.json";

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd()));

  const app = process.env.APP || "surface";
  process.env.VITE_APP = app;
  process.env.VITE_STORAGE_VERSION =
    mode === "dev" ? Date.now().toString() : packageJson.version;

  const SHIP_URL =
    process.env.SHIP_URL ||
    process.env.VITE_SHIP_URL ||
    "http://localhost:8080";
  const SHIP_URL2 =
    process.env.SHIP_URL2 ||
    process.env.VITE_SHIP_URL2 ||
    "http://localhost:8080";

  const base = (mode: string, app: string) => {
    if (mode === "mock" || mode === "staging") {
      return "";
    }

    switch (app) {
      case "chat":
        return "/apps/talk/";
      default:
        return "/apps/surface/";
    }
  };

  const plugins = (mode: string, app: string) => {
    if (mode === "mock" || mode === "staging") {
      return [basicSsl(), react()];
    }

    switch (app) {
      case "chat":
        return [
          process.env.SSL === "true" ? basicSsl() : null,
          urbitPlugin({
            base: "talk",
            target: mode === "dev2" ? SHIP_URL2 : SHIP_URL,
            changeOrigin: true,
            secure: false,
          }),
          react(),
        ];
      default:
        console.log(
          "default plugins",
          mode,
          app,
          mode === "dev2" ? SHIP_URL2 : SHIP_URL
        );
        return [
          process.env.SSL === "true" ? basicSsl() : null,
          urbitPlugin({
            base: "surface",
            target: mode === "dev2" ? SHIP_URL2 : SHIP_URL,
            changeOrigin: true,
            secure: false,
          }),
          react(),
        ];
    }
  };

  console.log(process.env.APP);
  console.log(mode, app, base(mode, app));

  const rollupOptions = {
    external:
      mode === "mock" || mode === "staging"
        ? ["virtual:pwa-register/react"]
        : [],
    output: {
      manualChunks: {
        lodash: ["lodash"],
        "lodash/fp": ["lodash/fp"],
        "@urbit/api": ["@urbit/api"],
        "@urbit/http-api": ["@urbit/http-api"],
      },
    },
  };

  return defineConfig({
    base: base(mode, app),
    server: {
      https: process.env.SSL === "true" ? true : false,
      host: "localhost",
      port: 3000,
    },
    build:
      mode !== "profile"
        ? {
            sourcemap: false,

            rollupOptions,
          }
        : ({
            rollupOptions: {
              ...rollupOptions,
            },
          } as BuildOptions),
    plugins: plugins(mode, app),
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  });
};
