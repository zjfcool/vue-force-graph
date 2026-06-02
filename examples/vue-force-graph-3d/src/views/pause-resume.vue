<template>
  <ForceGraph3D
    ref="graph"
    :graph-data="graphData"
    background-color="#101020"
    :enable-node-drag="false"
    :enable-navigation-controls="false"
    :show-nav-info="false"
  ></ForceGraph3D>
  <div style="position: absolute; top: 5px; right: 5px">
    <button @click="animationToggleHandle" style="margin: 8px; height: 25px; width: 150px">
      {{ isAnimationActive ? "Pause" : "Resume" }} Animation
    </button>
    <button style="margin: 8px; height: 25px; width: 150px" @click="rotationToggleHandle">
      {{ isRotationActive ? "Pause" : "Resume" }} Rotation
    </button>
  </div>
</template>
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import type { ForceGraph3DExpose } from "vue-force-graph-3d";

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
const distance = 1400;
const graph = ref<ForceGraph3DExpose>();
const isRotationActive = ref(true);
const isAnimationActive = ref(true);

let frameId: number;
// camera orbit
let angle = 0;
let preTime = Date.now();
function rotate() {
  if (isRotationActive.value) {
    graph.value?.cameraPosition({
      x: distance * Math.sin(angle),
      z: distance * Math.cos(angle),
    });
    angle += Math.PI / 300;
  }
}
function tick() {
  const time = Date.now();
  if (time - preTime > 10) {
    preTime = time;
    rotate();
  }
  frameId = requestAnimationFrame(tick);
}

function rotationToggleHandle() {
  isRotationActive.value = !isRotationActive.value;
}
function animationToggleHandle() {
  if (isAnimationActive.value) {
    graph.value?.pauseAnimation();
  } else {
    graph.value?.resumeAnimation();
  }
  //   graph.value?.refresh();
  isAnimationActive.value = !isAnimationActive.value;
}

onMounted(() => {
  graph.value?.cameraPosition({ z: distance });
  frameId = requestAnimationFrame(tick);
});
onBeforeUnmount(() => {
  cancelAnimationFrame(frameId);
});
</script>
