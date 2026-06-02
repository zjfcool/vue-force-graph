<template>
  <ForceGraph2D
    ref="graph"
    :graph-data="graphData"
    link-source="source"
    link-target="target"
    node-auto-color-by="group"
    node-id="id"
    node-label="id"
    node-val="val"
    :link-color="linkColorHandle"
  >
  </ForceGraph2D>
</template>
<script setup lang="ts">
import { onMounted, shallowRef } from "vue";
import type { ForceGraph2DData } from "vue-force-graph-2d";
const linkColorHandle = () => "rgba(255,255,255,0.2)";

const graphData = shallowRef<ForceGraph2DData>();
onMounted(() => {
  fetch("/vue-force-graph/2d/miserables.json")
    .then((res) => res.json())
    .then((data) => {
      graphData.value = data;
    });
});
</script>
