<template>
  <ForceGraphVR
    ref="graph"
    background-color="#101020"
    node-label="id"
    node-auto-color-by="group"
  ></ForceGraphVR>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { ForceGraphVRExpose } from "vue-force-graph-vr";
const graph = ref<ForceGraphVRExpose>();
onMounted(() => {
  graph.value?.jsonUrl("/vue-force-graph/vr/miserables.json");
});
</script>
