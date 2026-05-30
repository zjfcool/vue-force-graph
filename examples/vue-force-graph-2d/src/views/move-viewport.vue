<template>
  <ForceGraph2D ref="graph" :graph-data="graphData" :link-color="nodeColorHandle"></ForceGraph2D>
</template>
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import type { ForceGraph2DExpose } from "vue-force-graph-2d";
const graph = ref<ForceGraph2DExpose>();
// Random tree
const N = 300;
const graphData = {
  nodes: [...Array(N).keys()].map((i) => ({ id: i })),
  links: [...Array(N).keys()]
    .filter((id) => id)
    .map((id) => ({
      source: id,
      target: Math.round(Math.random() * (id - 1)),
    })),
};
const nodeColorHandle = () => "rgba(255,255,255,0.2)";
let k = 0,
  angle = 0,
  radius = 300,
  t = Date.now(),
  frameId: number;
function tick() {
  const a = Date.now();
  if (a - t > 10) {
    t = a;
    graph.value?.zoom(k);
    k += 0.001;
    graph.value?.centerAt(radius * Math.cos(angle), radius * Math.sin(angle));
    angle += Math.PI / 300;
  }
  frameId = requestAnimationFrame(tick);
}
onMounted(() => {
  if (graph.value) {
    frameId = requestAnimationFrame(tick);
  }
});
onBeforeUnmount(() => {
  cancelAnimationFrame(frameId);
});
</script>
