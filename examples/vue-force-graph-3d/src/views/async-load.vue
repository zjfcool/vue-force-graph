<template>
  <ForceGraph3D
    ref="graph"
    background-color="#101020"
    node-label="id"
    node-auto-color-by="group"
  ></ForceGraph3D>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { ForceGraph3DExpose } from "vue-force-graph-3d";
const graph = ref<ForceGraph3DExpose>();
onMounted(() => {
  graph.value?.jsonUrl("/vue-force-graph-3d/miserables.json");
});
</script>
