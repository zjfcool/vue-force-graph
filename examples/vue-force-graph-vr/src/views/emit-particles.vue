<template>
  <NoteMessage>
    <template #note> Click on a link or click button to emit particles </template>
    <button @click="emitParticlesHandle" class="emit-particles-btn">
      Emit 10 Random Particles
    </button>
    <ForceGraphVR
      ref="graph"
      :enable-resize="false"
      :graph-data="graphData"
      @link-click="linkClickHandle"
      :link-directional-particle-color="linkDirectionalParticleColorHandle"
      :link-hover-precision="10"
      :link-directional-particle-width="3"
      background-color="#101020"
    ></ForceGraphVR>
  </NoteMessage>
</template>
<script setup lang="ts">
import NoteMessage from "@/components/NoteMessage.vue";
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
