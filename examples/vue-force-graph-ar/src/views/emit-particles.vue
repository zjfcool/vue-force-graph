<template>
  <button @click="emitParticlesHandle" class="emit-particles-btn">Emit 10 Random Particles</button>
  <ForceGraphAR
    ref="graph"
    :graph-data="graphData"
    :link-directional-particle-color="linkDirectionalParticleColorHandle"
    :link-directional-particle-width="4"
  ></ForceGraphAR>
</template>
<script setup lang="ts">
import { ref } from "vue";
// Random tree
const graph = ref();
const N = 50;
const links = [...Array(N).keys()]
  .filter((id) => id)
  .map((id) => ({
    source: id,
    target: Math.round(Math.random() * (id - 1)),
  }));
const graphData = {
  nodes: [...Array(N).keys()].map((i) => ({ id: i })),
  links,
};
const linkDirectionalParticleColorHandle = () => "red";
const emitParticlesHandle = () => {
  [...Array(10).keys()].forEach(() => {
    const link = links[Math.floor(Math.random() * links.length)];
    graph.value.emitParticle(link);
  });
};
</script>
<style scoped>
.emit-particles-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 13px;
  z-index: 1;
  cursor: pointer;
}
</style>
