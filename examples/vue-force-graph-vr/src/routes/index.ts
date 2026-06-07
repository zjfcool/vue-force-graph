import { createRouter, createWebHashHistory } from "vue-router";

export const routes = [
  {
    path: "/",
    name: "Basic",
    component: () => import("../views/basic.vue"),
    meta: {
      source:
        "https://github.com/zjfcool/vue-force-graph/blob/main/examples/vue-force-graph-vr/src/views/basic.vue",
    },
  },
  {
    path: "/async-load",
    name: "AsyncLoad",
    component: () => import("../views/async-load.vue"),
    meta: {
      source:
        "https://github.com/zjfcool/vue-force-graph/blob/main/examples/vue-force-graph-vr/src/views/async-load.vue",
    },
  },
  {
    path: "/auto-colored",
    name: "AutoColored",
    component: () => import("../views/auto-colored.vue"),
    meta: {
      source:
        "https://github.com/zjfcool/vue-force-graph/blob/main/examples/vue-force-graph-vr/src/views/auto-colored.vue",
    },
  },
  {
    path: "/collistion-detection",
    name: "CollisionDetection",
    component: () => import("../views/collision-detection.vue"),
    meta: {
      source:
        "https://github.com/zjfcool/vue-force-graph/blob/main/examples/vue-force-graph-vr/src/views/collision-detection.vue",
    },
  },
  {
    path: "/curved-links",
    name: "CurvedLinks",
    component: () => import("../views/curved-links.vue"),
    meta: {
      source:
        "https://github.com/zjfcool/vue-force-graph/blob/main/examples/vue-force-graph-vr/src/views/curved-links.vue",
    },
  },
  {
    path: "/custom-node-geometry",
    name: "CustomNodeGeometry",
    component: () => import("../views/custom-node-geometry.vue"),
    meta: {
      source:
        "https://github.com/zjfcool/vue-force-graph/blob/main/examples/vue-force-graph-vr/src/views/custom-node-geometry.vue",
    },
  },
  {
    path: "/directional-links-arrows",
    name: "DirectionalLinksArrows",
    component: () => import("../views/directional-links-arrows.vue"),
    meta: {
      source:
        "https://github.com/zjfcool/vue-force-graph/blob/main/examples/vue-force-graph-vr/src/views/directional-links-arrows.vue",
    },
  },
  {
    path: "/directional-links-particles",
    name: "DirectionalLinksParticles",
    component: () => import("../views/directional-links-particles.vue"),
    meta: {
      source:
        "https://github.com/zjfcool/vue-force-graph/blob/main/examples/vue-force-graph-vr/src/views/directional-links-particles.vue",
    },
  },
  {
    path: "/emit-particles",
    name: "EmitParticles",
    component: () => import("../views/emit-particles.vue"),
    meta: {
      source:
        "https://github.com/zjfcool/vue-force-graph/blob/main/examples/vue-force-graph-vr/src/views/emit-particles.vue",
    },
  },
  {
    path: "/img-nodes",
    name: "ImgNodes",
    component: () => import("../views/img-nodes.vue"),
    meta: {
      source:
        "https://github.com/zjfcool/vue-force-graph/blob/main/examples/vue-force-graph-vr/src/views/img-nodes.vue",
    },
  },
  {
    path: "/large-graph",
    name: "LargeGraph",
    component: () => import("../views/large-graph.vue"),
    meta: {
      source:
        "https://github.com/zjfcool/vue-force-graph/blob/main/examples/vue-force-graph-vr/src/views/large-graph.vue",
    },
  },
  {
    path: "/text-links",
    name: "TextLinks",
    component: () => import("../views/text-links.vue"),
    meta: {
      source:
        "https://github.com/zjfcool/vue-force-graph/blob/main/examples/vue-force-graph-vr/src/views/text-links.vue",
    },
  },
  {
    path: "/text-nodes",
    name: "TextNodes",
    component: () => import("../views/text-nodes.vue"),
    meta: {
      source:
        "https://github.com/zjfcool/vue-force-graph/blob/main/examples/vue-force-graph-vr/src/views/text-nodes.vue",
    },
  },
];
export default createRouter({
  history: createWebHashHistory("/vue-force-graph/vr/"),
  routes,
});
