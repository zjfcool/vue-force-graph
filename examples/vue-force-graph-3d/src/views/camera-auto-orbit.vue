<template>
  <ForceGraph3D
    ref="graph"
    background-color="#101020"
    :graph-data="graphData"
    :enable-node-drag="false"
    :enable-navigation-controls="false"
    :show-nav-info="false"
  ></ForceGraph3D>
</template>
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import type { ForceGraph3DExpose } from "vue-force-graph-3d";
const graph = ref<ForceGraph3DExpose>();
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

const distance = 1400;
// camera orbit
let angle = 0;
let frameId: number;
function tick() {
  graph.value?.cameraPosition({
    x: distance * Math.sin(angle),
    z: distance * Math.cos(angle),
  });
  angle += Math.PI / 300;
  frameId = requestAnimationFrame(tick);
}
onMounted(() => {
  graph.value?.cameraPosition({ z: distance });
  frameId = requestAnimationFrame(tick);
});
onBeforeUnmount(() => {
  cancelAnimationFrame(frameId);
});
</script>
