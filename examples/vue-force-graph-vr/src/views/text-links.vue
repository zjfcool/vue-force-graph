<template>
  <ForceGraphVR
    ref="graph"
    :enable-resize="false"
    :graph-data="graphData"
    background-color="#101020"
    node-label="id"
    node-auto-color-by="group"
    :link-three-object-extend="true"
    :link-three-object="linkThreeObjectHandle"
    :link-position-update="linkPositionUpdateHandle"
  ></ForceGraphVR>
</template>
<script setup lang="ts">
// @ts-ignore
import SpriteText from "https://esm.sh/three-spritetext";
import { shallowRef, ref, onMounted } from "vue";
import type {
  ForceGraphVRExpose,
  ForceGraphVRData,
  ForceGraphVRLinkObject,
} from "vue-force-graph-vr";

const graphData = shallowRef<ForceGraphVRData>();
const graph = ref<ForceGraphVRExpose>();
const linkThreeObjectHandle = (link: ForceGraphVRLinkObject) => {
  // extend link with text sprite
  const sprite = new SpriteText(`${link.source} > ${link.target}`);
  sprite.color = "lightgrey";
  sprite.textHeight = 1.5;
  // 禁用射线检测
  sprite.raycast = () => {};
  return sprite;
};

const linkPositionUpdateHandle = (sprite: any, { start, end }: any) => {
  const middlePos: { [key: string]: number } = {};
  ["x", "y", "z"].forEach((c) => {
    middlePos[c] = start[c] + (end[c] - start[c]) / 2; // calc middle point
  });

  // Position sprite
  Object.assign(sprite.position, middlePos);
};

onMounted(async () => {
  const response = await fetch("/vue-force-graph/vr/miserables.json");
  const data = await response.json();
  graphData.value = data;

  // Spread nodes a little wider
  graph.value?.d3Force("charge")?.strength(-120);
});
</script>
