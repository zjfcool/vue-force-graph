<script setup lang="ts">
import { ref, onMounted } from "vue";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
const fgRef = ref();
const graphData = ref({
  nodes: [],
  links: [],
});
fetch("/miserables.json")
  .then((res) => res.json())
  .then((data) => (graphData.value = data));
onMounted(() => {
  const bloomPass = new UnrealBloomPass();
  bloomPass.strength = 3;
  bloomPass.radius = 1;
  bloomPass.threshold = 0.1;
  fgRef.value.postProcessingComposer().addPass(bloomPass);
});
</script>
<template>
  <VueForceGraph3D
    ref="fgRef"
    :graphData="graphData"
    backgroundColor="#090723"
    nodeLabel="id"
    nodeAutoColorBy="group"
  ></VueForceGraph3D>
</template>