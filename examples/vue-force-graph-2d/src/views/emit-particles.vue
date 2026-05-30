<template>
  <button @click="emitParticlesHandle" class="emit-particles-btn">Emit 10 Random Particles</button>
  <ForceGraph2D
    ref="graph"
    :graph-data="graphData"
    @link-click="linkClickHandle"
    :link-directional-particle-color="linkDirectionalParticleColorHandle"
    :link-hover-precision="10"
    :link-color="linkColorHandle"
  ></ForceGraph2D>
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
const linkColorHandle = () => "rgba(255,255,255,0.2)";
const linkClickHandle = (...args: any[]) => {
  graph.value.emitParticle(...args);
};
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
