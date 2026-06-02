<template>
  <ForceGraph2D
    :graph-data="graphData"
    node-label="id"
    node-auto-color-by="group"
    link-directional-particles="value"
    :link-directional-particle-speed="linkDirectionalParticleSpeedHandle"
    :link-color="linkColorHandle"
  >
  </ForceGraph2D>
</template>
<script setup lang="ts">
import { shallowRef } from "vue";
import type { ForceGraph2DLinkObject } from "vue-force-graph-2d";

const graphData = shallowRef({ nodes: [], links: [] });
const linkColorHandle = () => "rgba(255,255,255,0.2)";
const linkDirectionalParticleSpeedHandle = (d: ForceGraph2DLinkObject) => d.value * 0.001;
fetch("/vue-force-graph/2d/miserables.json")
  .then((res) => res.json())
  .then((data) => {
    graphData.value = data;
  });
</script>
