<template>
  <ForceGraph3D
    ref="graph"
    :graph-data="graphData"
    background-color="#101020"
    node-label="id"
    node-auto-color-by="group"
    :link-three-object-extend="true"
    :link-three-object="linkThreeObjectHandle"
    :link-position-update="linkPositionUpdateHandle"
  ></ForceGraph3D>
</template>
<script setup lang="ts">
// @ts-ignore
import SpriteText from "https://esm.sh/three-spritetext";
import { shallowRef, ref, onMounted } from "vue";
import type {
  ForceGraph3DExpose,
  ForceGraph3DData,
  ForceGraph3DLinkObject,
} from "vue-force-graph-3d";

const graphData = shallowRef<ForceGraph3DData>();
const graph = ref<ForceGraph3DExpose>();
const linkThreeObjectHandle = (link: ForceGraph3DLinkObject) => {
  // extend link with text sprite
  const sprite = new SpriteText(`${link.source} > ${link.target}`);
  sprite.color = "lightgrey";
  sprite.textHeight = 1.5;
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
  const response = await fetch("/vue-force-graph-3d/miserables.json");
  const data = await response.json();
  graphData.value = data;

  // Spread nodes a little wider
  graph.value?.d3Force("charge")?.strength(-120);
});
</script>
