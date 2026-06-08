<template>
  <ForceGraphVR
    ref="graph"
    background-color="#101020"
    node-auto-color-by="group"
    :node-three-object="nodeThreeObjectHandle"
    :node-three-object-extend="true"
  ></ForceGraphVR>
</template>
<script setup lang="ts">
// @ts-ignore
import SpriteText from "https://esm.sh/three-spritetext";
import { onMounted, ref } from "vue";
import type { ForceGraphVRExpose } from "vue-force-graph-vr";

const graph = ref<ForceGraphVRExpose | null>(null);
const nodeThreeObjectHandle = (node: any) => {
  const sprite = new SpriteText(node.id);
  sprite.material.depthWrite = false; // make sprite background transparent
  sprite.color = node.color;
  sprite.textHeight = 8;
  sprite.center.y = -0.6; // shift above node
  // 禁用射线检测
  sprite.raycast = () => {};
  return sprite;
};

onMounted(() => {
  graph.value?.jsonUrl("/vue-force-graph/vr/miserables.json");

  // Spread nodes a little wider
  graph.value?.d3Force("charge")?.strength(-120);
});
</script>
