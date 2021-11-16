<script setup lang="ts">
import { ref } from "vue";
import { genRandomTree } from "../utils";
const graphData = ref(genRandomTree());
const fgRef = ref();
const onLinkHover = (link) => fgRef.value.emitParticle(link);
</script>
<template>
  <VueForceGraph3D
    ref="fgRef"
    :graphData="graphData"
    backgroundColor="#090723"
    :linkDirectionalParticleColor="() => 'red'"
    :linkDirectionalParticleWidth="6"
    :linkHoverPrecision="10"
    :onLinkHover="onLinkHover"
  ></VueForceGraph3D>
</template>