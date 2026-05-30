<template>
  <ForceGraph2D
    ref="graph"
    :graph-data="graphData"
    node-label="id"
    dag-mode="td"
    :dag-level-distance="90"
    :warmup-ticks="250"
    :node-color="nodeColorHandle"
    @node-hover="nodeHoverHandle"
    @node-click="nodeClickHandle"
    :link-color="linkColorHandle"
  >
  </ForceGraph2D>
</template>
<script setup lang="ts">
import { forceCollide } from "d3-force";
// @ts-ignore
import { csvParse } from "https://esm.sh/d3-dsv";
import { onMounted, ref, shallowRef } from "vue";
import type {
  ForceGraph2DExpose,
  ForceGraph2DData,
  ForceGraph2DLinkObject,
  ForceGraph2DNodeObject,
} from "vue-force-graph-2d";
const graphData = shallowRef<ForceGraph2DData>();
const graph = ref<ForceGraph2DExpose>();
let nodesById: Record<string, ForceGraph2DNodeObject> = {};
const rootId = "d3";
const nodes: ForceGraph2DNodeObject[] = [],
  links: ForceGraph2DLinkObject[] = [];
const linkColorHandle = () => "rgba(255,255,255,0.2)";

const getPrunedTree = () => {
  const visibleNodes = [];
  const visibleLinks = [];

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
onMounted(() => {
  fetch("/vue-force-graph-2d/d3-dependencies.csv")
    .then((r) => r.text())
    .then(csvParse)
    .then((data) => {
      (data as unknown as { [key: string]: any }[]).forEach(({ path }) => {
        const levels = path.split("/"),
          level = levels.length - 1,
          module = level > 0 ? levels[1] : null,
          leaf = levels.pop(),
          parent = levels.join("/");

        const node = {
          id: path,
          leaf,
          module,
          collapsed: level > 0,
          childLinks: [],
        };

        nodes.push(node);

        if (parent) {
          links.push({ source: parent, target: path });
        }
      });
      nodesById = Object.fromEntries(nodes.map((node) => [node.id, node]));
      links.forEach((link) => {
        nodesById[link.source as number].childLinks.push(link);
      });
      graphData.value = getPrunedTree();
    });
  graph.value?.d3Force(
    "collision",
    forceCollide(() => 4),
  );
});
</script>
