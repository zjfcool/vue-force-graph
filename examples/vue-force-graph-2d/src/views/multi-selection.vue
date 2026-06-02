<template>
  <ForceGraph2D
    ref="graph"
    :graph-data="graphData"
    :node-rel-size="7"
    :link-color="linkColorHandle"
    :node-color="nodeColorHandle"
    @node-click="nodeClickHandle"
    @node-drag="nodeDragHandle"
    @node-drag-end="nodeDragEndHandle"
  ></ForceGraph2D>
</template>
<script setup lang="ts">
import type { ForceGraph2DNodeObject, ForceGraph2DExpose } from "vue-force-graph-2d";
import { ref } from "vue";
const graph = ref<ForceGraph2DExpose>();
// Random tree
const N = 30;
const graphData = {
  nodes: [...Array(N).keys()].map((i) => ({ id: i })),
  links: [...Array(N).keys()]
    .filter((id) => id)
    .map((id) => ({
      source: id,
      target: Math.round(Math.random() * (id - 1)),
    })),
};

let selectedNodes = new Set<ForceGraph2DNodeObject>();
const nodeColorHandle = (node: ForceGraph2DNodeObject) =>
  selectedNodes.has(node) ? "darkorange" : "grey";
const linkColorHandle = () => "rgba(255,255,255,0.2)";
const nodeClickHandle = (node: ForceGraph2DNodeObject, event: MouseEvent) => {
  if (event.ctrlKey || event.shiftKey || event.altKey) {
    // multi-selection
    if (selectedNodes.has(node)) {
      selectedNodes.delete(node);
    } else {
      selectedNodes.add(node);
    }
  } else {
    // single-selection
    const untoggle = selectedNodes.has(node) && selectedNodes.size === 1;
    selectedNodes.clear();
    if (!untoggle) {
      selectedNodes.add(node);
    }
  }

  graph.value?.nodeColor(graph.value?.nodeColor()); // update color of selected nodes
};
const nodeDragHandle = (node: ForceGraph2DNodeObject, translate: Record<string, number>) => {
  if (selectedNodes.has(node)) {
    // moving a selected node
    [...selectedNodes]
      .filter((selNode) => selNode !== node) // don't touch node being dragged
      .forEach((node) =>
        ["x", "y"].forEach((coord: string) => (node[`f${coord}`] = node[coord] + translate[coord])),
      ); // translate other nodes by same amount
  }
};
const nodeDragEndHandle = (node: ForceGraph2DNodeObject) => {
  if (selectedNodes.has(node)) {
    // finished moving a selected node
    [...selectedNodes]
      .filter((selNode) => selNode !== node) // don't touch node being dragged
      .forEach((node) => ["x", "y"].forEach((coord) => (node[`f${coord}`] = undefined))); // unfix controlled nodes
  }
};
</script>
