<template>
  <ForceGraphAR
    :enable-resize="false"
    :graph-data="graphData"
    :node-rel-size="10"
    :link-width="3"
    :node-opacity="0.9"
    :link-opacity="0.4"
    node-color="firebrick"
    link-color="darkgrey"
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
</script>
