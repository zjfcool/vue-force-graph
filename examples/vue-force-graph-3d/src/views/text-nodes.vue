<template>
  <ForceGraph3D
    ref="graph"
    background-color="#101020"
    node-auto-color-by="group"
    :node-three-object="nodeThreeObjectHandle"
    :node-three-object-extend="true"
  ></ForceGraph3D>
</template>
<script setup lang="ts">
// @ts-ignore
import SpriteText from "https://esm.sh/three-spritetext";
import { onMounted, ref } from "vue";
import type { ForceGraph3DExpose } from "vue-force-graph-3d";

const graph = ref<ForceGraph3DExpose | null>(null);
const nodeThreeObjectHandle = (node: any) => {
  const sprite = new SpriteText(node.id);
  sprite.material.depthWrite = false; // make sprite background transparent
  sprite.color = node.color;
  sprite.textHeight = 8;
  sprite.center.y = -0.6; // shift above node
  return sprite;
};

onMounted(() => {
  graph.value?.jsonUrl("/vue-force-graph-3d/miserables.json");

  // Spread nodes a little wider
  graph.value?.d3Force("charge")?.strength(-120);
});
</script>
