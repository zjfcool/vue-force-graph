import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".");
  console.log(env);
  const isProd = env.VITE_MODE === "production";
  return {
    base: isProd ? "/vue-force-graph/" : "/",
    plugins: [vue()],
    server: {
      port: 4000,
    },
  };
});
