<template>
  <ForceGraph3D
    ref="graph"
    @engine-stop="enginStopHandle"
    :graph-data="graphData"
    :cooldown-ticks="100"
    background-color="#101020"
  >
  </ForceGraph3D>
</template>
<script setup lang="ts">
import { ref } from "vue";
import type { ForceGraph3DExpose } from "vue-force-graph-3d";
const graph = ref<ForceGraph3DExpose>();
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
const enginStopHandle = () => {
  graph.value?.zoomToFit(400);
};
</script>
