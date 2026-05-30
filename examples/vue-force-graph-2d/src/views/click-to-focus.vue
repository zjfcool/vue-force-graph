<template>
  <ForceGraph2D
    ref="graph"
    :graph-data="graphData"
    node-label="id"
    node-auto-color-by="group"
    :link-directional-particles="2"
    :link-directional-particle-width="1.5"
    @node-click="nodeClickHandle"
    :link-color="linkColorHandle"
  >
  </ForceGraph2D>
</template>
<script setup lang="ts">
import { onMounted, ref, shallowRef } from "vue";
import type { ForceGraph2DNodeObject, ForceGraph2DExpose } from "vue-force-graph-2d";
const graphData = shallowRef({ nodes: [], links: [] });
const graph = ref<ForceGraph2DExpose>();
onMounted(async () => {
  const res = await fetch("/vue-force-graph-2d/miserables.json");
  const data = await res.json();
  graphData.value = data;
});
function nodeClickHandle(node: ForceGraph2DNodeObject) {
  graph.value?.centerAt(node.x, node.y, 1500);
  graph.value?.zoom(8, 2000);
}
const linkColorHandle = () => "rgba(255,255,255,0.2)";
</script>
