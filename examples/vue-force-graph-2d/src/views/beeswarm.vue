<template>
  <ForceGraph2D ref="graph" :graph-data="graphData"></ForceGraph2D>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { forceCollide, forceX, forceY } from "d3-force";
import type { ForceGraph2DExpose, ForceGraph2DNodeObject } from "vue-force-graph-2d";
const graph = ref<ForceGraph2DExpose | null>(null);
const N = 300;
const nodes = [...Array(N).keys()].map((i) => ({
  id: i,
  pos: Math.random(),
}));
const graphData = {
  nodes,
  links: [],
};

onMounted(() => {
  if (graph.value) {
    graph.value
      .d3Force("center", null)
      .d3Force("charge", null)
      // Add collision and x/y forces
      .d3Force("collide", forceCollide(4))
      .d3Force(
        "x",
        forceX((d: ForceGraph2DNodeObject) => {
          return (d.pos! - 0.5) * window.innerWidth;
        }),
      )
      .d3Force("y", forceY(0).strength(0.2))
      .zoom(0.99);
  }
});
</script>
