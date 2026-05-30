<template>
  <div class="all-mode-wrapper">
    <div class="force-graph-2d">
      <ForceGraph2D
        background-color="#000022"
        :link-color="linkColorHandle"
        style="width: 100%; height: 100%"
        :graph-data="graphData"
      >
      </ForceGraph2D>
      <a href="https://zjfcool.github.io/vue-force-graph-2d/">vue-force-graph-2d more examples</a>
    </div>
    <div class="force-graph-3d">
      <ForceGraph3D
        background-color="#000022"
        link-color="'rgba(255,255,255,0.2)'"
        style="width: 100%; height: 100%"
        :graph-data="graphData"
      >
      </ForceGraph3D>
      <a href="https://zjfcool.github.io/vue-force-graph-3d/">vue-force-graph-3d more examples</a>
    </div>
    <div class="force-graph-vr">
      <ForceGraphVR
        style="width: 100%; height: 100%"
        link-color="'rgba(255,255,255,0.2)'"
        :graph-data="graphData"
      />
      <a href="https://zjfcool.github.io/vue-force-graph-vr/">vue-force-graph-vr more examples</a>
    </div>
    <div class="force-graph-ar">
      <!-- <ForceGraphAR style="width: 100%; height: 100%" :graph-data="graphData" /> -->
      <a href="https://zjfcool.github.io/vue-force-graph-ar/">vue-force-graph-ar more examples</a>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  ForceGraph2D,
  ForceGraph3D,
  // ForceGraphAR,
  ForceGraphVR,
} from "vue-force-graph";
import { genRandomTree } from "./utils";
const graphData = genRandomTree(50);
const linkColorHandle = () => {
  return "rgba(255,255,255,0.2)";
};
</script>
<style scoped>
.all-mode-wrapper {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    "force-graph-2d force-graph-3d "
    " force-graph-ar force-graph-vr";
  background-color: #000022;
}

.force-graph-2d,
.force-graph-3d,
.force-graph-ar,
.force-graph-vr {
  position: relative;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.force-graph-2d a,
.force-graph-3d a,
.force-graph-ar a,
.force-graph-vr a {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  color: #adadad;
}

.force-graph-2d {
  grid-area: force-graph-2d;
}

.force-graph-3d {
  grid-area: force-graph-3d;
}

.force-graph-ar {
  grid-area: force-graph-ar;
}

.force-graph-vr {
  grid-area: force-graph-vr;
}
</style>
