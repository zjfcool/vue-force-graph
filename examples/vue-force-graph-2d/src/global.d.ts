import ForceGraph2D from "vue-force-graph-2d";

declare module "vue" {
  export interface GlobalComponents {
    ForceGraph2D: typeof ForceGraph2D;
  }
}
declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    ForceGraph2D: typeof ForceGraph2D;
  }
}
