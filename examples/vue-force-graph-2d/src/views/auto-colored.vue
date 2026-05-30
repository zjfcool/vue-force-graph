<template>
  <ForceGraph2D
    :graph-data="graphData"
    node-auto-color-by="group"
    :link-auto-color-by="linkAutoColorBy"
  >
  </ForceGraph2D>
</template>
<script setup lang="ts">
import type { ForceGraph2DLinkObject } from "vue-force-graph-2d";

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
function linkAutoColorBy(d: ForceGraph2DLinkObject) {
  return graphData.nodes[d.source as number].group;
}
</script>
