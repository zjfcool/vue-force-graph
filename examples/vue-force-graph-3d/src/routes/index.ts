import { createRouter, createWebHashHistory } from "vue-router";

export const routes = [
  {
    path: "/",
    name: "Basic",
    component: () => import("../views/basic.vue"),
  },
  {
    path: "/display-grid",
    name: "DisplayGrid",
    component: () => import("../views/display-grid.vue"),
  },
  {
    path: "/async-load",
    name: "AsyncLoad",
    component: () => import("../views/async-load.vue"),
  },
  {
    path: "/auto-colored",
    name: "AutoColored",
    component: () => import("../views/auto-colored.vue"),
  },
  {
    path: "/bloom-effect",
    name: "BloomEffect",
    component: () => import("../views/bloom-effect.vue"),
  },
  {
    path: "/camera-auto-orbit",
    name: "CameraAutoOrbit",
    component: () => import("../views/camera-auto-orbit.vue"),
  },
  {
    path: "/click-to-focus",
    name: "ClickToFocus",
    component: () => import("../views/click-to-focus.vue"),
  },
  {
    path: "/collistion-detection",
    name: "CollisionDetection",
    component: () => import("../views/collision-detection.vue"),
  },
  {
    path: "/controls-fly",
    name: "ControlsFly",
    component: () => import("../views/controls-fly.vue"),
  },
  {
    path: "/controls-orbit",
    name: "ControlsOrbit",
    component: () => import("../views/controls-orbit.vue"),
  },
  {
    path: "/curved-links",
    name: "CurvedLinks",
    component: () => import("../views/curved-links.vue"),
  },
  {
    path: "/custom-node-geometry",
    name: "CustomNodeGeometry",
    component: () => import("../views/custom-node-geometry.vue"),
  },
  {
    path: "/dag-yarn",
    name: "DagYarn",
    component: () => import("../views/dag-yarn.vue"),
  },
  {
    path: "/directional-links-arrows",
    name: "DirectionalLinksArrows",
    component: () => import("../views/directional-links-arrows.vue"),
  },
  {
    path: "/directional-links-particles",
    name: "DirectionalLinksParticles",
    component: () => import("../views/directional-links-particles.vue"),
  },
  {
    path: "/dynamic",
    name: "Dynamic",
    component: () => import("../views/dynamic.vue"),
  },
  {
    path: "/emit-particles",
    name: "EmitParticles",
    component: () => import("../views/emit-particles.vue"),
  },
  {
    path: "/expandable-nodes",
    name: "ExpandableNodes",
    component: () => import("../views/expandable-nodes.vue"),
  },
  {
    path: "/fit-to-canvas",
    name: "FitToCanvas",
    component: () => import("../views/fit-to-canvas.vue"),
  },
  {
    path: "/fix-dragged-nodes",
    name: "FixDraggedNodes",
    component: () => import("../views/fix-dragged-nodes.vue"),
  },
  {
    path: "/gradient-links",
    name: "GradientLinks",
    component: () => import("../views/gradient-links.vue"),
  },
  {
    path: "/highlight",
    name: "Highlight",
    component: () => import("../views/highlight.vue"),
  },
  {
    path: "/html-nodes",
    name: "HtmlNodes",
    component: () => import("../views/html-nodes.vue"),
  },
  {
    path: "/img-nodes",
    name: "ImgNodes",
    component: () => import("../views/img-nodes.vue"),
  },
  {
    path: "/large-graph",
    name: "LargeGraph",
    component: () => import("../views/large-graph.vue"),
  },
  {
    path: "/manipulate-link-force",
    name: "ManipulateLinkForce",
    component: () => import("../views/manipulate-link-force.vue"),
  },
  {
    path: "/multi-selection",
    name: "MultiSelection",
    component: () => import("../views/multi-selection.vue"),
  },
  {
    path: "/pause-resume",
    name: "PauseResume",
    component: () => import("../views/pause-resume.vue"),
  },
  {
    path: "/scene",
    name: "Scene",
    component: () => import("../views/scene.vue"),
  },
  {
    path: "/text-links",
    name: "TextLinks",
    component: () => import("../views/text-links.vue"),
  },
  {
    path: "/text-nodes",
    name: "TextNodes",
    component: () => import("../views/text-nodes.vue"),
  },
  {
    path: "/tree",
    name: "Tree",
    component: () => import("../views/tree.vue"),
  },
];
export default createRouter({
  history: createWebHashHistory("/vue-force-graph/3d/"),
  routes,
});
