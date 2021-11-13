<script setup lang="ts">
import { ref } from "vue";
import { genRandomTree } from "../utils";
const graphData = ref(genRandomTree());
const fgRef = ref();
function onEngineStop() {
  fgRef.value.zoomToFit(400);
}
</script>
<template>
  <VueForceGraph2D
    ref="fgRef"
    :graphData="graphData"
    backgroundColor="#090723"
    :cooldownTicks="100"
    :onEngineStop="onEngineStop"
    :linkColor="() => 'rgba(255,255,255,.2)'"
  ></VueForceGraph2D>
</template>