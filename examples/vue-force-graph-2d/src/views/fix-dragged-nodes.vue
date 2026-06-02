<template>
  <ForceGraph2D
    :graph-data="graphData"
    @node-drag-end="nodeDragEndHandle"
    node-label="id"
    node-auto-color-by="group"
    :link-color="linkColorHandle"
  >
  </ForceGraph2D>
</template>
<script setup lang="ts">
import { shallowRef } from "vue";
import type { ForceGraph2DData, ForceGraph2DNodeObject } from "vue-force-graph-2d";

const graphData = shallowRef<ForceGraph2DData>();
const linkColorHandle = () => "rgba(255,255,255,0.2)";
const nodeDragEndHandle = (node: ForceGraph2DNodeObject) => {
  node.fx = node.x;
  node.fy = node.y;
};
fetch("/vue-force-graph/2d/miserables.json")
  .then((res) => res.json())
  .then((data) => {
    graphData.value = data;
  });
</script>
