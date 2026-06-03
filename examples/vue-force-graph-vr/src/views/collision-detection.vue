<template>
  <ForceGraphVR
    ref="graph"
    :enable-resize="false"
    :graph-data="graphData"
    :cooldown-time="Infinity"
    :d3-alpha-decay="0"
    :d3-velocity-decay="0"
    background-color="#101020"
  ></ForceGraphVR>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
// @ts-ignore
import { forceCollide } from "https://esm.sh/d3-force-3d";
import type { ForceGraphVRExpose, ForceGraphVRNodeObject } from "vue-force-graph-vr";
const graph = ref<ForceGraphVRExpose>();
const N = 50;
const nodes = [...Array(N).keys()].map(() => ({
  // Initial velocity in random direction
  vx: Math.random(),
  vy: Math.random(),
  vz: Math.random(),
}));
const graphData = { nodes, links: [] };
onMounted(() => {
  // Deactivate existing forces
  graph.value
    ?.d3Force("center", null)
    .d3Force("charge", null)

    // Add collision and bounding box forces
    .d3Force("collide", forceCollide(graph.value.nodeRelSize()))
    .d3Force("box", () => {
      const CUBE_HALF_SIDE = (graph.value?.nodeRelSize() as number) * N * 0.5;

      nodes.forEach((node: ForceGraphVRNodeObject) => {
        const x = node.x || 0,
          y = node.y || 0,
          z = node.z || 0;

        // bounce on box walls
        if (Math.abs(x) > CUBE_HALF_SIDE) {
          node.vx! *= -1;
        }
        if (Math.abs(y) > CUBE_HALF_SIDE) {
          node.vy! *= -1;
        }
        if (Math.abs(z) > CUBE_HALF_SIDE) {
          node.vz! *= -1;
        }
      });
    });
});
</script>
