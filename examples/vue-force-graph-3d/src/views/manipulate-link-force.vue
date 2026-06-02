<template>
  <ForceGraph3D
    ref="graph"
    background-color="#101020"
    :graph-data="graphData"
    :node-label="nodeLabelHandle"
    :link-color="linkColorHandle"
    :link-opacity="1"
  ></ForceGraph3D>
</template>
<script setup lang="ts">
// @ts-ignore
import { GUI } from "https://esm.sh/dat.gui";
import { onBeforeUnmount, onMounted, ref } from "vue";
import type {
  ForceGraph3DExpose,
  ForceGraph3DLinkObject,
  ForceGraph3DNodeObject,
} from "vue-force-graph-3d";

const graph = ref<ForceGraph3DExpose>();

// Create Random tree
const N = 20;
const graphData = {
  nodes: [...Array(N).keys()].map((i) => ({ id: i })),
  links: [...Array(N).keys()]
    .filter((id) => id)
    .map((id) => ({
      source: id,
      target: Math.round(Math.random() * (id - 1)),
      color: id % 2,
    })),
};
const nodeLabelHandle = (node: ForceGraph3DNodeObject) => `${node.id}`;
const linkColorHandle = (link: ForceGraph3DLinkObject) => (link.color ? "red" : "green");
//Define GUI
class Settings {
  redDistance: number;
  greenDistance: number;
  constructor() {
    this.redDistance = 20;
    this.greenDistance = 20;
  }
}

const settings = new Settings();
const gui = new GUI();

const controllerOne = gui.add(settings, "redDistance", 0, 100);
const controllerTwo = gui.add(settings, "greenDistance", 0, 100);

onMounted(() => {
  const linkForce = graph.value?.d3Force("link");

  if (!linkForce) return;

  linkForce.distance((link: ForceGraph3DLinkObject) =>
    link.color ? settings.redDistance : settings.greenDistance,
  );

  controllerOne.onChange(updateLinkDistance);
  controllerTwo.onChange(updateLinkDistance);

  function updateLinkDistance() {
    if (linkForce) {
      linkForce.distance((link: ForceGraph3DLinkObject) =>
        link.color ? settings.redDistance : settings.greenDistance,
      );
    }
    graph.value?.numDimensions(3); // Re-heat simulation
  }
});
onBeforeUnmount(() => {
  gui.destroy();
});
</script>
