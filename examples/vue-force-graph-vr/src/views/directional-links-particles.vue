<template>
  <ForceGraphVR
    :enable-resize="false"
    background-color="#101020"
    :graph-data="graphData"
    node-label="id"
    node-auto-color-by="group"
    link-directional-particles="value"
    :link-directional-particle-speed="linkDirectionalParticleSpeedHandle"
  ></ForceGraphVR>
</template>
<script setup lang="ts">
import { onMounted, shallowRef } from "vue";
import type { ForceGraphVRData, ForceGraphVRLinkObject } from "vue-force-graph-vr";
const graphData = shallowRef<ForceGraphVRData>();
const linkDirectionalParticleSpeedHandle = (d: ForceGraphVRLinkObject) => d.value * 0.001;

onMounted(async () => {
  const res = await fetch("/vue-force-graph/vr/miserables.json");
  const data = await res.json();
  graphData.value = data;
});
</script>
