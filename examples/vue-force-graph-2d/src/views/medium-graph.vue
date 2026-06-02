<template>
  <ForceGraph2D
    :graph-data="graphData"
    :node-rel-size="6"
    node-auto-color-by="user"
    :link-directional-particles="1"
    :link-color="linkColorHandle"
    :node-label="nodeLabelHandle"
    @node-click="nodeClickHandle"
  ></ForceGraph2D>
</template>
<script setup lang="ts">
import { shallowRef } from "vue";
import type { ForceGraph2DData, ForceGraph2DNodeObject } from "vue-force-graph-2d";
const graphData = shallowRef<ForceGraph2DData>();
const nodeClickHandle = (node: ForceGraph2DNodeObject) => {
  window.open(`https://bl.ocks.org/${node.user}/${node.id}`, "_blank");
};
const nodeLabelHandle = (node: ForceGraph2DNodeObject) => {
  return `${node.user}: ${node.description}`;
};
const linkColorHandle = () => "rgba(255,255,255,0.2)";
fetch("/vue-force-graph/2d/blocks.json")
  .then((res) => res.json())
  .then((data) => {
    graphData.value = data;
  });
</script>
