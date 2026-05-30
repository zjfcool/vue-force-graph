import { defineConfig } from "tsdown";
import Vue from "unplugin-vue/rolldown";

export default defineConfig({
  entry: ["./src/index.ts"],
  platform: "neutral",
  plugins: [Vue({ isProduction: true })],
  dts: { vue: true },
  deps: {
    neverBundle: [
      "force-graph",
      "3d-force-graph",
      "3d-force-graph-ar",
      "3d-force-graph-vr",
      "vue-force-graph-2d",
      "vue-force-graph-3d",
      "vue-force-graph-vr",
      "vue-force-graph-ar",
      "vue",
      "three",
    ],
  },
});
