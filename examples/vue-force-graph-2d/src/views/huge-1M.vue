<template>
  <ForceGraph2D
    ref="graph"
    :graph-data="graphData"
    :link-color="linkColorHandle"
    :enable-pointer-interaction="false"
    :d3AlphaDecay="0"
    :d3VelocityDecay="0.08"
    :warmupTicks="10"
    :cooldownTicks="0"
  ></ForceGraph2D>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { ForceGraph2DExpose } from "vue-force-graph-2d";

window.devicePixelRatio = 1; // use standard resolution in retina displays
// console.log(window.devicePixelRatio);
const graph = ref<ForceGraph2DExpose>();
// Random tree
const N = 10000;
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
onMounted(() => {
  graph.value?.zoom(0.1);
  // graph.value?.zoomToFit(400)
});
</script>
