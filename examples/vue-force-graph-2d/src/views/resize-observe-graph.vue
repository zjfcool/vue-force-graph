<template>
  <ForceGraph2D
    style="position: absolute; right: 0; bottom: 0; border: 1px solid #6d6dff"
    :graph-data="graphData"
    :link-directional-particles="2"
    :link-color="linkColorHandle"
    :resize-debounce-time="0"
    :resize-observe-element="resizeElement"
  >
  </ForceGraph2D>
  <ForceGraph2D
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
    :graph-data="graphData"
    :link-directional-particles="2"
    :link-color="linkColorHandle"
    :resize-debounce-time="0"
  >
  </ForceGraph2D>
  <div style="width: 49%; height: 49%" ref="resizeElement" class="resize-element">
    <span>Tip: Drag The Icon To Resize</span>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { genRandomTree } from "@/utils";
const graphData = genRandomTree(300);
const resizeElement = ref();
const linkColorHandle = () => "rgba(255,255,255,0.2)";
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
