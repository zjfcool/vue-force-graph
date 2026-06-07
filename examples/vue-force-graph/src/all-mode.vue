<template>
  <div class="all-mode-wrapper">
    <div
      class="force-graph-item"
      v-for="{ id, href, name, is, npm, ...attrs } in graphList"
      :key="id"
    >
      <component
        :is="is"
        style="width: 100%; height: 100%"
        background-color="#000022"
        v-bind="attrs"
      ></component>
      <a :href="href" target="_blank" class="name">More {{ name }} Examples</a>
      <a :href="npm" target="_blank" class="npm-icon"
        ><svg
          t="1780796099813"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1660"
          width="48"
          height="48"
        >
          <path
            d="M0 320v352h288v64h224v-64h512V320H0z m56.864 56.864h227.648v245.376H227.52v-188.416H170.688v188.416H56.864v-245.376z m284.512 0H568.928v245.312h-113.792v56.96h-113.76v-302.272z m284.448 0H967.2v245.376h-56.96v-188.416h-56.864v188.416h-56.864v-188.416h-56.96v188.416h-113.728v-245.376z m-170.688 56.96v131.552H512v-131.552h-56.864z"
            p-id="1661"
          ></path></svg
      ></a>
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
    name: "2D",
    npm: "https://www.npmjs.com/package/vue-force-graph-2d",
    graphData: genRandomTree(500),
    linkColor: linkColorHandle,
    nodeAutoColorBy: "id",
    is: ForceGraph2D,
    href: "https://zjfcool.github.io/vue-force-graph/2d/",
  },
  {
    id: 1,
    name: "3D",
    npm: "https://www.npmjs.com/package/vue-force-graph-3d",
    graphData: genRandomTree(50),
    nodeAutoColorBy: "id",
    linkDirectionalParticles: 3,
    linkDirectionalParticleWidth: 3.5,
    linkColor: "rgba(255,255,255,0.2)",
    is: ForceGraph3D,
    href: "https://zjfcool.github.io/vue-force-graph/3d/",
  },
  {
    id: 2,
    name: "VR",
    npm: "https://www.npmjs.com/package/vue-force-graph-vr",
    graphData: genRandomTree(50),
    linkColor: "rgba(255,255,255,0.2)",
    nodeAutoColorBy: "id",
    is: ForceGraphVR,
    href: "https://zjfcool.github.io/vue-force-graph/vr/",
  },
  // {
  //   id: 3,
  //   name: "vue-force-graph-ar",
  //   href: "https://zjfcool.github.io/vue-force-graph/ar/",
  //   // is: ForceGraphAR,
  // },
];
</script>
<style scoped>
.all-mode-wrapper {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  background-color: #000022;
}

.force-graph-item {
  position: relative;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.force-graph-item a.name {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  color: #b3b1b1;
}
.force-graph-item a.name:hover {
  color: #6d6dff;
}
.force-graph-item a.npm-icon {
  position: absolute;
  top: 0px;
  right: 12px;
}
.force-graph-item a.npm-icon svg {
  fill: #6d6dff;
}
.force-graph-item a.npm-icon:hover svg {
  fill: #5e5ef9;
}
</style>
