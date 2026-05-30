<template>
  <ForceGraph2D
    ref="graph"
    :graph-data="graphData"
    :cooldown-time="Infinity"
    :d3-alpha-decay="0"
    :d3-velocity-decay="0"
  ></ForceGraph2D>
</template>
<script setup lang="ts">
import { ref, shallowRef, onMounted } from "vue";
import type { ForceGraph2DExpose, ForceGraph2DNodeObject } from "vue-force-graph-2d";
import { forceCollide } from "d3-force";
const graph = ref<ForceGraph2DExpose>();

const nodeRelSize = 4;
const N = 80;
const nodes = [...Array(N).keys()].map(() => ({
  // Initial velocity in random direction
  vx: Math.random() * 2 - 1,
  vy: Math.random() * 2 - 1,
})) as (ForceGraph2DNodeObject & { vx: number; vy: number })[];
const graphData = shallowRef();
onMounted(() => {
  graph.value
    ?.d3Force("center", null)
    .d3Force("charge", null)
    .d3Force("collide", forceCollide(nodeRelSize))
    .d3Force("box", () => {
      const SQUARE_HALF_SIDE = nodeRelSize * N * 0.5;
      nodes.forEach((node) => {
        const x = node.x || 0,
          y = node.y || 0;

        // bounce on box walls
        if (Math.abs(x) > SQUARE_HALF_SIDE) {
          node.vx *= -1;
        }
        if (Math.abs(y) > SQUARE_HALF_SIDE) {
          node.vy *= -1;
        }
      });
      graphData.value = { nodes, links: [] };
    });
});
</script>
