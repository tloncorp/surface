import { urbitPlugin } from "@urbit/vite-plugin-urbit";
import basicSsl from "@vitejs/plugin-basic-ssl";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import { BuildOptions, defineConfig, loadEnv } from "vite";
import packageJson from "./package.json";

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd()));

  const app = process.env.APP || "groups";
  process.env.VITE_APP = app;
  process.env.VITE_STORAGE_VERSION =
    mode === "dev" ? Date.now().toString() : packageJson.version;

  const SHIP_URL =
    process.env.SHIP_URL ||
    process.env.VITE_SHIP_URL ||
    "http://localhost:8080";
  console.log(SHIP_URL);
  const SHIP_URL2 =
    process.env.SHIP_URL2 ||
    process.env.VITE_SHIP_URL2 ||
    "http://localhost:8080";
  console.log(SHIP_URL2);

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

    console.log(mode, SHIP_URL);

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
        "@tlon/sigil-js": ["@tlon/sigil-js"],
        "any-ascii": ["any-ascii"],
        "react-beautiful-dnd": ["react-beautiful-dnd"],
        "emoji-mart": ["emoji-mart"],
        "prosemirror-view": ["prosemirror-view"],
        "@tiptap/core": ["@tiptap/core"],
        "@tiptap/extension-placeholder": ["@tiptap/extension-placeholder"],
        "@tiptap/extension-link": ["@tiptap/extension-link"],
        "react-virtuoso": ["react-virtuoso"],
        "react-select": ["react-select"],
        "react-hook-form": ["react-hook-form"],
        "framer-motion": ["framer-motion"],
        "date-fns": ["date-fns"],
        "tippy.js": ["tippy.js"],
        "@aws-sdk/client-s3": ["@aws-sdk/client-s3"],
        "@aws-sdk/s3-request-presigner": ["@aws-sdk/s3-request-presigner"],
        refractor: ["refractor"],
        "urbit-ob": ["urbit-ob"],
        "hast-to-hyperscript": ["hast-to-hyperscript"],
        "@radix-ui/react-dialog": ["@radix-ui/react-dialog"],
        "@radix-ui/react-dropdown-menu": ["@radix-ui/react-dropdown-menu"],
        "@radix-ui/react-popover": ["@radix-ui/react-popover"],
        "@radix-ui/react-toast": ["@radix-ui/react-toast"],
        "@radix-ui/react-tooltip": ["@radix-ui/react-tooltip"],
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
