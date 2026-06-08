<template>
  <ForceGraphVR
    background-color="#101020"
    node-auto-color-by="group"
    :link-auto-color-by="linkAutoColorByHandle"
    :graph-data="graphData"
    :link-opacity="0.5"
  ></ForceGraphVR>
</template>
<script setup lang="ts">
import type { ForceGraphVRLinkObject } from "vue-force-graph-vr";
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
const linkAutoColorByHandle = (d: ForceGraphVRLinkObject) =>
  graphData.nodes[d.source as number].group;
</script>
