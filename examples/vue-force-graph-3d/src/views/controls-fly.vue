<template>
  <NoteMessage>
    <template #note> WASD:move, R|F:up|down, Q|E:roll, up|down:pitch, left|right:yaw </template>
    <ForceGraph3D
      ref="graph"
      background-color="#101020"
      node-label="id"
      node-auto-color-by="group"
      control-type="fly"
      :show-nav-info="false"
    ></ForceGraph3D>
  </NoteMessage>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { ForceGraph3DExpose } from "vue-force-graph-3d";
import NoteMessage from "@/components/NoteMessage.vue";
const graph = ref<ForceGraph3DExpose>();
onMounted(() => {
  graph.value?.jsonUrl("/vue-force-graph/3d/miserables.json");
});
</script>
