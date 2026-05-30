import { createRouter, createWebHistory } from "vue-router";

export const routes = [
  {
    path: "/",
    name: "Basic",
    component: () => import("../views/basic.vue"),
  },
  {
    path: "/beeswarm",
    name: "Beeswarm",
    component: () => import("../views/beeswarm.vue"),
  },
  {
    path: "/auto-colored",
    name: "AutoColored",
    component: () => import("../views/auto-colored.vue"),
  },
  {
    path: "/build-a-graph",
    name: "BuildAGraph",
    component: () => import("../views/build-a-graph.vue"),
  },
  {
    path: "/click-to-focus",
    name: "ClickToFocus",
    component: () => import("../views/click-to-focus.vue"),
  },
  {
    path: "/collision-detection",
    name: "CollisionDetection",
    component: () => import("../views/collision-detection.vue"),
  },
  {
    path: "/curved-links-computed-curvature",
    name: "CurvedLinksComputedCurvature",
    component: () => import("../views/curved-links-computed-curvature.vue"),
  },
  {
    path: "/curved-links",
    name: "CurvedLinks",
    component: () => import("../views/curved-links.vue"),
  },
  {
    path: "/custom-node-shape",
    name: "CustomNodeShape",
    component: () => import("../views/custom-node-shape.vue"),
  },
  {
    path: "/dag-yarn",
    name: "DagYarn",
    component: () => import("../views/dag-yarn.vue"),
  },
  {
    path: "/dagre",
    name: "Dagre",
    component: () => import("../views/dagre.vue"),
  },
  {
    path: "/dash-odd-links",
    name: "DashOddLinks",
    component: () => import("../views/dash-odd-links.vue"),
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
    path: "/expandable-tree",
    name: "ExpandableTree",
    component: () => import("../views/expandable-tree.vue"),
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
    path: "/highlight",
    name: "Highlight",
    component: () => import("../views/highlight.vue"),
  },
  {
    path: "/huge-1M",
    name: "Huge1M",
    component: () => import("../views/huge-1M.vue"),
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
    path: "/load-json",
    name: "LoadJson",
    component: () => import("../views/load-json.vue"),
  },
  {
    path: "/medium-graph",
    name: "MediumGraph",
    component: () => import("../views/medium-graph.vue"),
  },
  {
    path: "/move-viewport",
    name: "MoveViewport",
    component: () => import("../views/move-viewport.vue"),
  },
  {
    path: "/multi-selection",
    name: "MultiSelection",
    component: () => import("../views/multi-selection.vue"),
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
  history: createWebHistory("/vue-force-graph-2d/"),
  routes,
});
