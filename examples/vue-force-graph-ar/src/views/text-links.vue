<template>
  <ForceGraphAR
    ref="graph"
    :graph-data="graphData"
    node-auto-color-by="group"
    :link-three-object-extend="true"
    :link-three-object="linkThreeObjectHandle"
    :link-position-update="linkPositionUpdateHandle"
  ></ForceGraphAR>
</template>
<script setup lang="ts">
// @ts-ignore
import SpriteText from "https://esm.sh/three-spritetext";
import { shallowRef, ref, onMounted } from "vue";
import type {
  ForceGraphARExpose,
  ForceGraphARData,
  ForceGraphARLinkObject,
} from "vue-force-graph-ar";

const graphData = shallowRef<ForceGraphARData>();
const graph = ref<ForceGraphARExpose>();
const linkThreeObjectHandle = (link: ForceGraphARLinkObject) => {
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
  const response = await fetch("/vue-force-graph/ar/miserables.json");
  const data = await response.json();
  graphData.value = data;

  // Spread nodes a little wider
  graph.value?.d3Force("charge")?.strength(-120);
});
</script>
