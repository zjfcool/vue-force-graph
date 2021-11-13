<script setup lang="ts">
import { ref } from "vue";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer.js";
const extraRenderers = [new CSS2DRenderer()];
const graphData = ref({
  nodes: [],
  links: [],
});
fetch("/miserables.json")
  .then((res) => res.json())
  .then((data) => (graphData.value = data));
function nodeThreeObject(node) {
  const nodeEl = document.createElement("div");
  nodeEl.textContent = node.id;
  nodeEl.style.color = node.color;
  nodeEl.className = "node-label";
  return new CSS2DObject(nodeEl);
}
</script>
<template>
  <VueForceGraph3D
    :extraRenderers="extraRenderers"
    :graphData="graphData"
    backgroundColor="#090723"
    nodeAutoColorBy="group"
    :nodeThreeObject="nodeThreeObject"
    :nodeThreeObjectExtend="true"
  ></VueForceGraph3D>
</template>
<style>
.node-label {
  font-size: 12px;
  padding: 1px 4px;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.5);
  user-select: none;
}
</style>