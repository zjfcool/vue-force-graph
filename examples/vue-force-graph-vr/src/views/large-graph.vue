<template>
  <ForceGraphVR
    :enable-resize="false"
    background-color="#101020"
    node-auto-color-by="user"
    :node-label="nodeLabelHandle"
    @node-click="nodeClickHandle"
    :graph-data="graphData"
  ></ForceGraphVR>
</template>
<script setup lang="ts">
import { onMounted, shallowRef } from "vue";
import type { ForceGraphVRData, ForceGraphVRNodeObject } from "vue-force-graph-vr";
const graphData = shallowRef<ForceGraphVRData>();
const nodeLabelHandle = (node: ForceGraphVRNodeObject) => `${node.user}: ${node.description}`;
const nodeClickHandle = (node: ForceGraphVRNodeObject) =>
  window.open(`https://bl.ocks.org/${node.user}/${node.id}`, "_blank");
onMounted(async () => {
  const res = await fetch("/vue-force-graph/vr/blocks.json");
  graphData.value = await res.json();
});
</script>
