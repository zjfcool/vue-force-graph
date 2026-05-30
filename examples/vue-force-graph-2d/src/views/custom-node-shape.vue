<template>
  <ForceGraph2D
    :graph-data="graphData"
    :node-canvas-object="nodeCanvasObjectHandle"
    :node-pointer-area-paint="nodePaint"
    node-label="id"
    :link-color="linkColorHandle"
  ></ForceGraph2D>
</template>
<script setup lang="ts">
import type { ForceGraph2DNodeObject } from "vue-force-graph-2d";

// Random tree
const N = 20;
const graphData = {
  nodes: [...Array(N).keys()].map((i) => ({ id: i })),
  links: [...Array(N).keys()]
    .filter((id) => id)
    .map((id) => ({
      source: id,
      target: Math.round(Math.random() * (id - 1)),
    })),
};

// gen a number persistent color from around the palette
const getColor = (n: number) =>
  "#" + ((n * 1234567) % Math.pow(2, 24)).toString(16).padStart(6, "0");

const linkColorHandle = () => "rgba(255,255,255,0.2)";
function nodePaint(node: ForceGraph2DNodeObject, color: string, ctx: CanvasRenderingContext2D) {
  const x = node.x!;
  const y = node.y!;
  const id = node.id as number;
  ctx.fillStyle = color;
  [
    () => {
      ctx.fillRect(x - 6, y - 4, 12, 8);
    }, // rectangle
    () => {
      ctx.beginPath();
      ctx.moveTo(x, y! - 5);
      ctx.lineTo(x - 5, y + 5);
      ctx.lineTo(x + 5, y + 5);
      ctx.fill();
    }, // triangle
    () => {
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI, false);
      ctx.fill();
    }, // circle
    () => {
      ctx.font = "10px Sans-Serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Text", x, y);
    }, // text
  ][id % 4]();
}
function nodeCanvasObjectHandle(node: ForceGraph2DNodeObject, ctx: CanvasRenderingContext2D) {
  nodePaint(node, getColor(Number(node.id)), ctx);
}
</script>
