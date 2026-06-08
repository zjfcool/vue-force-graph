<template>
  <ForceGraph3D
    style="position: absolute; right: 0; bottom: 0; border: 1px solid #6d6dff"
    background-color="#101020"
    :graph-data="graphData"
    :resize-debounce-time="0"
    :resize-observe-element="resizeElement"
  ></ForceGraph3D>
  <ForceGraph3D
    style="
      position: absolute;
      right: 200px;
      top: 0;
      width: 200px;
      height: 200px;
      resize: both;
      overflow: auto;
      border: 1px solid #6d6dff;
    "
    background-color="#101020"
    :graph-data="graphData"
    :resize-debounce-time="0"
  ></ForceGraph3D>
  <div style="width: 49%; height: 49%" ref="resizeElement" class="resize-element">
    <span>Tip: Drag The Icon To Resize</span>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
// Random tree
const N = 300;
const graphData = {
  nodes: [...Array(N).keys()].map((i) => ({ id: i })),
  links: [...Array(N).keys()]
    .filter((id) => id)
    .map((id) => ({
      source: id,
      target: Math.round(Math.random() * (id - 1)),
    })),
};
const resizeElement = ref();
</script>
<style scoped>
.resize-element {
  position: absolute;
  top: 0;
  left: 0;
  resize: both;
  overflow: auto;
  border: 1px solid #6d6dff;
  z-index: 2;
}
.resize-element span {
  position: absolute;
  bottom: 0;
  right: 6px;
  color: #6d6dff;
  font-weight: bold;
}
</style>
