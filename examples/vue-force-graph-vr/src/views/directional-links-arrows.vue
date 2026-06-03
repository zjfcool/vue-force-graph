<template>
  <ForceGraphVR
    :enable-resize="false"
    background-color="#101020"
    :graph-data="graphData"
    :link-directional-arrow-length="3.5"
    :link-directional-arrow-rel-pos="1"
    :link-curvature="0.25"
  ></ForceGraphVR>
</template>
<script setup lang="ts">
// Random tree
const N = 40;
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
