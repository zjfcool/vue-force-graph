<!-- <template>
  <ForceGraphAR
    :enable-resize="false"
    :graph-data="graphData"
    :node-rel-size="10"
    :link-width="3"
    :node-opacity="0.9"
    :link-opacity="0.4"
    :link-color="() => 'darkgrey'"
  ></ForceGraphAR>
</template>
<script setup lang="ts">
// Random tree
const N = 200;
const graphData = {
  nodes: [...Array(N).keys()].map((i) => ({ id: i })),
  links: [...Array(N).keys()]
    .filter((id) => id)
    .map((id) => ({
      source: id,
      target: Math.round(Math.random() * (id - 1)),
    })),
};
</script> -->
<template>
  <ForceGraphAR
    ref="graph"
    :enable-resize="false"
    :marker-attrs="{ preset: 'hiro' }"
  ></ForceGraphAR>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { ForceGraphARExpose } from "vue-force-graph-ar";
const graph = ref<ForceGraphARExpose | null>(null);
// Random tree
const N = 200;
const gData = {
  nodes: [...Array(N).keys()].map((i) => ({ id: i })),
  links: [...Array(N).keys()]
    .filter((id) => id)
    .map((id) => ({
      source: id,
      target: Math.round(Math.random() * (id - 1)),
    })),
};

onMounted(() => {
  console.log("mounted", graph.value);
  graph.value
    ?.graphData(gData)
    .nodeRelSize(10)
    .linkWidth(3)
    .nodeOpacity(0.9)
    .linkOpacity(0.4)
    .nodeColor(() => "firebrick")
    .linkColor(() => "darkgrey");
});
</script>
