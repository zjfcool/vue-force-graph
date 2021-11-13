<script setup lang="ts">
import { ref, onMounted, onBeforeMount } from "vue";
import { genRandomTree } from "../utils";
const graphData = ref(genRandomTree());
const distance = 1400;
const fgRef = ref();
let timer: any = null;
let angle = 0;
function animate() {
  fgRef.value.cameraPosition({
    x: distance * Math.sin(angle),
    z: distance * Math.cos(angle),
  });
  angle += Math.PI / 3000;
  timer = window.requestAnimationFrame(animate);
}
onMounted(() => {
  fgRef.value.cameraPosition({ z: distance });

  animate();
});
onBeforeMount(() => {
  cancelAnimationFrame(timer);
});
</script>
<template>
  <VueForceGraph3D
    ref="fgRef"
    :graphData="graphData"
    backgroundColor="#090723"
    :cooldownTicks="100"
    :showNavInfo="false"
    :enableNavigationControls="false"
  ></VueForceGraph3D>
</template>