<template>
  <ForceGraph2D
    ref="graph"
    :graph-data="graphData"
    :d3-alpha-decay="0"
    :cooldown-time="60000"
    :link-color="linkColorHandle"
    :enable-pointer-interaction="false"
    node-auto-color-by="id"
  ></ForceGraph2D>
</template>
<script setup lang="ts">
import { onMounted, ref, shallowRef } from "vue";
import type {
  ForceGraph2DExpose,
  ForceGraph2DData,
  ForceGraph2DNodeObject,
} from "vue-force-graph-2d";

window.devicePixelRatio = 1; // use standard resolution in retina displays

const graphData = shallowRef<ForceGraph2DData>();
const graph = ref<ForceGraph2DExpose>();
const linkColorHandle = () => "rgba(255,255,255,0.065)";
fetch("/vue-force-graph/2d/mplate.mtx")
  .then((res) => res.text())
  .then((mtxData) => {
    let nodeSet = new Set();

    const pairs = mtxData
      .split("\n")
      .slice(14, -1)
      .map((d) => d.split(" "));

    pairs.forEach((d) => {
      nodeSet.add(d[0]);
      nodeSet.add(d[1]);
    });

    const nodes = Array.from(nodeSet).map((d) => ({ id: d })) as ForceGraph2DNodeObject[];
    const links = pairs.filter((d) => d[0] !== d[1]).map((d) => ({ source: d[0], target: d[1] }));
    graphData.value = { nodes, links };
  });
onMounted(() => {
  graph.value?.zoom(0.08);
});
</script>
