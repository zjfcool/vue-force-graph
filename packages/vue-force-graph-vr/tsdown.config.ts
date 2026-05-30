import { defineConfig } from "tsdown";
import Vue from "unplugin-vue/rolldown";

export default defineConfig({
  entry: ["./src/index.ts"],
  platform: "neutral",
  plugins: [Vue({ isProduction: true })],
  dts: { vue: true },
  deps: {
    alwaysBundle: ["utils"],
    neverBundle: ["three", "vue", "3d-force-graph-vr"],
  },
});
