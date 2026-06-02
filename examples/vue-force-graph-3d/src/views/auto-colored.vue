<template>
  <ForceGraph3D
    background-color="#101020"
    node-auto-color-by="group"
    :link-auto-color-by="linkAutoColorByHandle"
    :graph-data="graphData"
    :link-opacity="0.5"
  ></ForceGraph3D>
</template>
<script setup lang="ts">
import type { ForceGraph3DLinkObject } from "vue-force-graph-3d";
// Random tree
const NODES = 300;
const GROUPS = 12;
const graphData = {
  nodes: [...Array(NODES).keys()].map((i) => ({
    id: i,
    group: Math.ceil(Math.random() * GROUPS),
  })),
  links: [...Array(NODES).keys()]
    .filter((id) => id)
    .map((id) => ({
      source: id,
      target: Math.round(Math.random() * (id - 1)),
    })),
};
const linkAutoColorByHandle = (d: ForceGraph3DLinkObject) =>
  graphData.nodes[d.source as number].group;
</script>
