<template>
  <ForceGraphVR background-color="#101020" :graph-data="graphData"></ForceGraphVR>
</template>
<script setup lang="ts">
// Random tree
const N = 300;
const graphData = {
  nodes: [...Array(N).keys()].map((i) => ({ id: i })),
  links: [...Array(N).keys()]
    .filter((id) => id)
    .map((id) => ({
      source: id,
      target: Math.round(Math.random() * (id - 1)),
    })),
};
</script>
