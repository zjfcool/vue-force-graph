<template>
  <ForceGraph3D
    ref="graph"
    node-label="id"
    node-auto-color-by="group"
    @node-click="nodeClickHandle"
    background-color="#101020"
  ></ForceGraph3D>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { ForceGraph3DExpose, ForceGraph3DNodeObject } from "vue-force-graph-3d";
const graph = ref<ForceGraph3DExpose>();

const nodeClickHandle = (node: ForceGraph3DNodeObject) => {
  // Aim at node from outside it
  const distance = 40;
  const distRatio = 1 + distance / Math.hypot(node.x!, node.y!, node.z!);

  const newPos =
    node.x || node.y || node.z
      ? { x: node.x! * distRatio, y: node.y! * distRatio, z: node.z! * distRatio }
      : { x: 0, y: 0, z: distance }; // special case if node is in (0,0,0)

  graph.value?.cameraPosition(
    newPos, // new position
    node as { x: number; y: number; z: number }, // lookAt ({ x, y, z })
    3000, // ms transition duration
  );
};
onMounted(() => {
  graph.value?.jsonUrl("/vue-force-graph-3d/miserables.json");
});
</script>
