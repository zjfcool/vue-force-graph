<template>
  <ForceGraph2D
    ref="graph"
    @engine-stop="enginStopHandle"
    :graph-data="graphData"
    :cooldown-ticks="100"
    :link-color="linkColorHandle"
  >
  </ForceGraph2D>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { ForceGraph2DExpose } from "vue-force-graph-2d";
const graph = ref<ForceGraph2DExpose>();
// Random tree
const N = 100;
const graphData = {
  nodes: [...Array(N).keys()].map((i) => ({ id: i })),
  links: [...Array(N).keys()]
    .filter((id) => id)
    .map((id) => ({
      source: id,
      target: Math.round(Math.random() * (id - 1)),
    })),
};
const linkColorHandle = () => "rgba(255,255,255,0.2)";
const enginStopHandle = () => {
  graph.value?.zoomToFit(400);
};
onMounted(() => {
  graph.value?.d3Force("center", null);
});
</script>
