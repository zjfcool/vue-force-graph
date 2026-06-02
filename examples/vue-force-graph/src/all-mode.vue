<template>
  <div class="all-mode-wrapper">
    <div class="force-graph-item" v-for="{ id, href, name, is, ...attrs } in graphList" :key="id">
      <component
        :is="is"
        style="width: 100%; height: 100%"
        background-color="#000022"
        v-bind="attrs"
      ></component>
      <a :href="href" target="_blank">{{ name }} more examples</a>
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
const linkColorHandle = () => {
  return "rgba(255,255,255,0.2)";
};
const graphList = [
  {
    id: 0,
    name: "vue-force-graph-2d",
    graphData: genRandomTree(500),
    linkColor: linkColorHandle,
    nodeAutoColorBy: "id",
    is: ForceGraph2D,
    href: "https://zjfcool.github.io/vue-force-graph-2d/",
  },
  {
    id: 1,
    name: "vue-force-graph-3d",
    graphData: genRandomTree(50),
    nodeAutoColorBy: "id",
    linkDirectionalParticles: 3,
    linkDirectionalParticleWidth: 3.5,
    linkColor: "rgba(255,255,255,0.2)",
    is: ForceGraph3D,
    href: "https://zjfcool.github.io/vue-force-graph-3d/",
  },
  {
    id: 2,
    name: "vue-force-graph-vr",
    graphData: genRandomTree(50),
    linkColor: "rgba(255,255,255,0.2)",
    nodeAutoColorBy: "id",
    is: ForceGraphVR,
    href: "https://zjfcool.github.io/vue-force-graph-vr/",
  },
  {
    id: 3,
    name: "vue-force-graph-ar",
    href: "https://zjfcool.github.io/vue-force-graph-ar/",
    // is: ForceGraphAR,
  },
];
</script>
<style scoped>
.all-mode-wrapper {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  background-color: #000022;
}

.force-graph-item {
  position: relative;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.force-graph-item a {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  color: #adadad;
}
</style>
