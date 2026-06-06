<template>
  <ForceGraphAR
    node-auto-color-by="user"
    :graph-data="graphData"
    :gl-scale="1000"
    :y-offset="2"
    :node-rel-size="8"
    :node-opacity="0.9"
    :link-opacity="0.3"
    :link-with="2"
    :link-color="() => 'darkgrey'"
  ></ForceGraphAR>
</template>
<script setup lang="ts">
import { onMounted, shallowRef } from "vue";
import type { ForceGraphARData } from "vue-force-graph-ar";
const graphData = shallowRef<ForceGraphARData>();

onMounted(async () => {
  const res = await fetch("/vue-force-graph/ar/blocks.json");
  graphData.value = await res.json();
});
</script>
