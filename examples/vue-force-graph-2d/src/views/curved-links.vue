<template>
  <ForceGraph2D
    :graph-data="graphData"
    :link-directional-particles="2"
    link-curvature="curvature"
    :link-color="linkColorHandle"
  ></ForceGraph2D>
</template>
<script setup lang="ts">
const graphData = {
  nodes: [...Array(9).keys()].map((i) => ({ id: i })),
  links: [
    { source: 1, target: 4, curvature: 0 },
    { source: 1, target: 4, curvature: 0.5 },
    { source: 1, target: 4, curvature: -0.5 },
    { source: 5, target: 2, curvature: 0.3 },
    { source: 2, target: 5, curvature: 0.3 },
    { source: 0, target: 3, curvature: 0 },
    { source: 3, target: 3, curvature: 0.5 },
    { source: 0, target: 4, curvature: 0.2 },
    { source: 4, target: 5, curvature: 0.5 },
    { source: 5, target: 6, curvature: 0.7 },
    { source: 6, target: 7, curvature: 1 },
    { source: 7, target: 8, curvature: 2 },
    { source: 8, target: 0, curvature: 0.5 },
  ],
};
const linkColorHandle = () => "rgba(255,255,255,0.2)";
</script>
