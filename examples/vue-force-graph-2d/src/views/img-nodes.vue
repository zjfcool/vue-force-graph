<template>
  <ForceGraph2D
    :graph-data="graphData"
    :node-canvas-object="nodeCanvasObjectHandle"
    :node-pointer-area-paint="nodePointerAreaPaintHandle"
    :link-color="linkColorHandle"
  >
  </ForceGraph2D>
</template>
<script setup lang="ts">
import type { ForceGraph2DNodeObject } from "vue-force-graph-2d";

const imgs = [
  "cat.jpg",
  "dog.jpg",
  "eagle.jpg",
  "elephant.jpg",
  "grasshopper.jpg",
  "octopus.jpg",
  "owl.jpg",
  "panda.jpg",
  "squirrel.jpg",
  "tiger.jpg",
  "whale.jpg",
].map((src) => {
  const img = new Image();
  img.src = `/vue-force-graph-2d/imgs/${src}`;
  return img;
});
const linkColorHandle = () => "rgba(255,255,255,0.2)";
const nodeCanvasObjectHandle = (
  { x, y, img }: ForceGraph2DNodeObject,
  ctx: CanvasRenderingContext2D,
) => {
  const size = 12;
  ctx.drawImage(img, x! - size / 2, y! - size / 2, size, size);
};
const nodePointerAreaPaintHandle = (
  node: ForceGraph2DNodeObject,
  color: string,
  ctx: CanvasRenderingContext2D,
) => {
  const size = 12;
  ctx.fillStyle = color;
  ctx.fillRect(node.x! - size / 2, node.y! - size / 2, size, size); // draw square as pointer trap
};
// Random connected graph
const graphData = {
  nodes: imgs.map((img, id) => ({ id, img })),
  links: [...Array(imgs.length).keys()]
    .filter((id) => id)
    .map((id) => ({
      source: id,
      target: Math.round(Math.random() * (id - 1)),
    })),
};
</script>
