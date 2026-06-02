<template>
  <NoteMessage>
    <template #note
      >Ctr+Click | Shift+Click | Alt+Click to select multiple nodes, Click to
      toggle-select</template
    >
    <ForceGraph3D
      ref="graph"
      background-color="#101020"
      :graph-data="graphData"
      :node-rel-size="7"
      :node-color="nodeColorHandle"
      @node-click="nodeClickHandle"
      @node-drag="nodeDragHandle"
      @node-drag-end="nodeDragEndHandle"
      :show-nav-info="false"
    ></ForceGraph3D>
  </NoteMessage>
</template>
<script setup lang="ts">
import type { ForceGraph3DNodeObject, ForceGraph3DExpose } from "vue-force-graph-3d";
import { ref } from "vue";
import NoteMessage from "@/components/NoteMessage.vue";
const graph = ref<ForceGraph3DExpose>();
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

let selectedNodes = new Set<ForceGraph3DNodeObject>();
const nodeColorHandle = (node: ForceGraph3DNodeObject) =>
  selectedNodes.has(node) ? "yellow" : "grey";
const nodeClickHandle = (node: ForceGraph3DNodeObject, event: MouseEvent) => {
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
const nodeDragHandle = (node: ForceGraph3DNodeObject, translate: Record<string, number>) => {
  if (selectedNodes.has(node)) {
    // moving a selected node
    [...selectedNodes]
      .filter((selNode) => selNode !== node) // don't touch node being dragged
      .forEach((node) =>
        ["x", "y", "z"].forEach(
          (coord: string) => (node[`f${coord}`] = node[coord] + translate[coord]),
        ),
      ); // translate other nodes by same amount
  }
};
const nodeDragEndHandle = (node: ForceGraph3DNodeObject) => {
  if (selectedNodes.has(node)) {
    // finished moving a selected node
    [...selectedNodes]
      .filter((selNode) => selNode !== node) // don't touch node being dragged
      .forEach((node) => ["x", "y", "z"].forEach((coord) => (node[`f${coord}`] = undefined))); // unfix controlled nodes
  }
};
</script>
