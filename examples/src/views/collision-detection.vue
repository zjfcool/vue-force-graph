<script setup lang="ts">
import { forceCollide } from "d3-force";
import { ref, onMounted } from "vue";
const graphData = ref({
  nodes: [],
  links: [],
});
const fgRef = ref();
function init() {
  const fg = fgRef.value;
  fg.d3Force("center", null);
  fg.d3Force("charge", null);

  // Add collision and bounding box forces
  fg.d3Force("collide", forceCollide(4));
  fg.d3Force("box", () => {
    const SQUARE_HALF_SIDE = N * 2;

    nodes.forEach((node: any) => {
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
  });

  // Generate nodes
  const N = 80;
  const nodes = [...Array(N).keys()].map(() => ({
    // Initial velocity in random direction
    vx: Math.random() * 2 - 1,
    vy: Math.random() * 2 - 1,
  }));
  graphData.value = { nodes: nodes as any, links: [] };
}
onMounted(() => {
  init();
});
</script>
<template>
  <VueForceGraph2D
    ref="fgRef"
    :graphData="graphData"
    :cooldownTime="Infinity"
    backgroundColor="#090723"
    :d3AlphaDecay="0"
    :d3VelocityDecay="0"
  ></VueForceGraph2D>
</template>