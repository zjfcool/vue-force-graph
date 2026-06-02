<template>
  <ForceGraph3D
    background-color="#101020"
    node-auto-color-by="user"
    :node-label="nodeLabelHandle"
    @node-click="nodeClickHandle"
    :graph-data="graphData"
  ></ForceGraph3D>
</template>
<script setup lang="ts">
import { onMounted, shallowRef } from "vue";
import type { ForceGraph3DData, ForceGraph3DNodeObject } from "vue-force-graph-3d";
const graphData = shallowRef<ForceGraph3DData>();
const nodeLabelHandle = (node: ForceGraph3DNodeObject) => `${node.user}: ${node.description}`;
const nodeClickHandle = (node: ForceGraph3DNodeObject) =>
  window.open(`https://bl.ocks.org/${node.user}/${node.id}`, "_blank");
onMounted(async () => {
  const res = await fetch("/vue-force-graph/3d/blocks.json");
  graphData.value = await res.json();
});
</script>
