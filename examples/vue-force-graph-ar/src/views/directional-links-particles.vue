<template>
  <ForceGraphAR
    :graph-data="graphData"
    node-label="id"
    node-auto-color-by="group"
    link-directional-particles="value"
    :link-directional-particle-speed="linkDirectionalParticleSpeedHandle"
    :link-directional-particle-width="3"
    :node-rel-size="5"
    :node-opacity="0.9"
    :link-opacity="0.4"
    :gl-scale="150"
    :y-offset="2"
    :link-color="() => 'darkgrey'"
  ></ForceGraphAR>
</template>
<script setup lang="ts">
import { onMounted, shallowRef } from "vue";
import type { ForceGraphARData, ForceGraphARLinkObject } from "vue-force-graph-ar";
const graphData = shallowRef<ForceGraphARData>();
const linkDirectionalParticleSpeedHandle = (d: ForceGraphARLinkObject) => d.value * 0.001;

onMounted(async () => {
  const res = await fetch("/vue-force-graph/ar/miserables.json");
  const data = await res.json();
  graphData.value = data;
});
</script>
