<template>
  <ForceGraph2D
    ref="graph"
    :graph-data="graphData"
    @node-hover="nodeHoverHandle"
    @node-click="nodeClickHandle"
    :link-directional-particles="1"
    :link-directional-particle-width="2.5"
    :node-color="nodeColorHandle"
    :link-color="linkColorHandle"
  >
  </ForceGraph2D>
</template>
<script setup lang="ts">
import { ref, shallowRef } from "vue";
import type {
  ForceGraph2DExpose,
  ForceGraph2DData,
  ForceGraph2DLinkObject,
  ForceGraph2DNodeObject,
} from "vue-force-graph-2d";

const graph = ref<ForceGraph2DExpose>();
const graphData = shallowRef<ForceGraph2DData>();
const linkColorHandle = () => "rgba(255,255,255,0.2)";

const rootId = 0;

// Random tree
const N = 300;
const gData: ForceGraph2DData = {
  nodes: [...Array(N).keys()].map((i) => ({ id: i, collapsed: i !== rootId, childLinks: [] })),
  links: [...Array(N).keys()]
    .filter((id) => id)
    .map((id) => ({
      source: Math.round(Math.random() * (id - 1)),
      target: id,
    })),
};

// link parent/children
const nodesById = Object.fromEntries(gData.nodes.map((node) => [node.id, node]));
gData.links.forEach((link) => {
  nodesById[link.source as number].childLinks.push(link);
});

const getPrunedTree = () => {
  const visibleNodes: ForceGraph2DNodeObject[] = [];
  const visibleLinks: ForceGraph2DLinkObject[] = [];

  (function traverseTree(node = nodesById[rootId]) {
    visibleNodes.push(node);
    if (node.collapsed) return;
    visibleLinks.push(...node.childLinks);
    node.childLinks
      .map((link: ForceGraph2DLinkObject) =>
        typeof link.target === "object" ? link.target : nodesById[link.target as number],
      ) // get child node
      .forEach(traverseTree);
  })(); // IIFE

  return { nodes: visibleNodes, links: visibleLinks };
};
graphData.value = getPrunedTree();
const nodeHoverHandle = (node: ForceGraph2DNodeObject | null) => {
  const wrapperElement = graph.value?.wrapperElement;
  if (wrapperElement instanceof HTMLElement) {
    wrapperElement.style.cursor = node && node.childLinks.length ? "pointer" : "";
  }
};
const nodeClickHandle = (node: ForceGraph2DNodeObject) => {
  if (node.childLinks.length) {
    node.collapsed = !node.collapsed; // toggle collapse state
    graphData.value = getPrunedTree();
  }
};
const nodeColorHandle = (node: ForceGraph2DNodeObject) =>
  !node.childLinks.length ? "green" : node.collapsed ? "red" : "yellow";
</script>
<style>
.clickable {
  cursor: unset !important;
}
</style>
