<template>
  <NoteMessage>
    <template #note>
      Click red node to expand, Click yellow node to collapse, green node is leaf node
    </template>
    <ForceGraph3D
      ref="graph"
      :graph-data="graphData"
      @node-hover="nodeHoverHandle"
      @node-click="nodeClickHandle"
      :link-directional-particles="1"
      :link-directional-particle-width="2.5"
      :node-color="nodeColorHandle"
      :show-nav-info="false"
      background-color="#101020"
    >
    </ForceGraph3D>
  </NoteMessage>
</template>
<script setup lang="ts">
import NoteMessage from "@/components/NoteMessage.vue";
import { ref, shallowRef } from "vue";
import type {
  ForceGraph3DExpose,
  ForceGraph3DData,
  ForceGraph3DLinkObject,
  ForceGraph3DNodeObject,
} from "vue-force-graph-3d";

const graph = ref<ForceGraph3DExpose>();
const graphData = shallowRef<ForceGraph3DData>();

const rootId = 0;

// Random tree
const N = 300;
const gData: ForceGraph3DData = {
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
  const visibleNodes: ForceGraph3DNodeObject[] = [];
  const visibleLinks: ForceGraph3DLinkObject[] = [];

  (function traverseTree(node = nodesById[rootId]) {
    visibleNodes.push(node);
    if (node.collapsed) return;
    visibleLinks.push(...node.childLinks);
    node.childLinks
      .map((link: ForceGraph3DLinkObject) =>
        typeof link.target === "object" ? link.target : nodesById[link.target as number],
      ) // get child node
      .forEach(traverseTree);
  })(); // IIFE

  return { nodes: visibleNodes, links: visibleLinks };
};
graphData.value = getPrunedTree();
const nodeHoverHandle = (node: ForceGraph3DNodeObject | null) => {
  const wrapperElement = graph.value?.wrapperElement;
  if (wrapperElement instanceof HTMLElement) {
    wrapperElement.style.cursor = node && node.childLinks.length ? "pointer" : "";
  }
};
const nodeClickHandle = (node: ForceGraph3DNodeObject) => {
  if (node.childLinks.length) {
    node.collapsed = !node.collapsed; // toggle collapse state
    graphData.value = getPrunedTree();
  }
};
const nodeColorHandle = (node: ForceGraph3DNodeObject) =>
  !node.childLinks.length ? "green" : node.collapsed ? "red" : "yellow";
</script>
<style>
.clickable {
  cursor: unset !important;
}
</style>
