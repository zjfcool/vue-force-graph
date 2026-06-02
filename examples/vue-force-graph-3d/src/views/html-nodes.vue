<template>
  <ForceGraph3D
    background-color="#101020"
    :graph-data="graphData"
    :extra-renderers="extraRenderers"
    node-auto-color-by="group"
    :node-three-object-extend="true"
    :node-three-object="nodeThreeObjectHandle"
  ></ForceGraph3D>
</template>
<script setup lang="ts">
import { shallowRef, onMounted } from "vue";
import { CSS2DRenderer, CSS2DObject } from "three/addons/renderers/CSS2DRenderer.js";
import type { ForceGraph3DData, ForceGraph3DNodeObject } from "vue-force-graph-3d";

const graphData = shallowRef<ForceGraph3DData>();

const extraRenderers = [new CSS2DRenderer()];
const nodeThreeObjectHandle = (node: ForceGraph3DNodeObject) => {
  const nodeEl = document.createElement("div");
  nodeEl.textContent = node.id as string;
  nodeEl.style.color = node.color;
  nodeEl.className = "node-label";
  return new CSS2DObject(nodeEl);
};

onMounted(async () => {
  const res = await fetch("/vue-force-graph/3d/miserables.json");
  graphData.value = await res.json();
});
</script>
<style>
.node-label {
  font-size: 12px;
  padding: 1px 4px;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.5);
  user-select: none;
}
</style>
