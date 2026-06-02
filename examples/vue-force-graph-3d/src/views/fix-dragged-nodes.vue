<template>
  <NoteMessage>
    <template #note> Drag node </template>
    <ForceGraph3D
      :graph-data="graphData"
      @node-drag-end="nodeDragEndHandle"
      node-label="id"
      node-auto-color-by="group"
      :show-nav-info="false"
      background-color="#101020"
    >
    </ForceGraph3D>
  </NoteMessage>
</template>
<script setup lang="ts">
import NoteMessage from "@/components/NoteMessage.vue";
import { shallowRef } from "vue";
import type { ForceGraph3DData, ForceGraph3DNodeObject } from "vue-force-graph-3d";

const graphData = shallowRef<ForceGraph3DData>();
const nodeDragEndHandle = (node: ForceGraph3DNodeObject) => {
  node.fx = node.x;
  node.fy = node.y;
  node.fz = node.z;
};
fetch("/vue-force-graph/3d/miserables.json")
  .then((res) => res.json())
  .then((data) => {
    graphData.value = data;
  });
</script>
