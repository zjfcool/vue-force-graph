<template>
  <ForceGraph3D
    background-color="#101020"
    :graph-data="graphData"
    node-label="id"
    node-auto-color-by="group"
    link-directional-particles="value"
    :link-directional-particle-speed="linkDirectionalParticleSpeedHandle"
  ></ForceGraph3D>
</template>
<script setup lang="ts">
import { onMounted, shallowRef } from "vue";
import type { ForceGraph3DData, ForceGraph3DLinkObject } from "vue-force-graph-3d";
const graphData = shallowRef<ForceGraph3DData>();
const linkDirectionalParticleSpeedHandle = (d: ForceGraph3DLinkObject) => d.value * 0.001;

onMounted(async () => {
  const res = await fetch("/vue-force-graph-3d/miserables.json");
  const data = await res.json();
  graphData.value = data;
});
</script>
