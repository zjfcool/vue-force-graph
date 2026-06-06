<template>
  <ForceGraphAR
    node-auto-color-by="group"
    :link-auto-color-by="linkAutoColorByHandle"
    :graph-data="graphData"
    :link-opacity="0.5"
    :node-opacity="0.9"
    :node-rel-size="10"
    :link-width="3"
  ></ForceGraphAR>
</template>
<script setup lang="ts">
import type { ForceGraphARLinkObject } from "vue-force-graph-ar";
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
const linkAutoColorByHandle = (d: ForceGraphARLinkObject) =>
  graphData.nodes[d.source as number].group;
</script>
