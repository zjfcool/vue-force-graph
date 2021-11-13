<script setup lang="ts">
import { ref } from "vue";
import { genRandomTree } from "../utils";
function nodePaint({ id, x, y }, color, ctx) {
  ctx.fillStyle = color;
  [
    () => {
      ctx.fillRect(x - 6, y - 4, 12, 8);
    }, // rectangle
    () => {
      ctx.beginPath();
      ctx.moveTo(x, y - 5);
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
const getColor = (n) =>
  "#" + ((n * 1234567) % Math.pow(2, 24)).toString(16).padStart(6, "0");
const graphData = ref(genRandomTree(20));
</script>
<template>
  <VueForceGraph2D
    :graphData="graphData"
    backgroundColor="#090723"
    nodeLabel="id"
    :nodeCanvasObject="(node, ctx) => nodePaint(node, getColor(node.id), ctx)"
    :nodePointerAreaPaint="nodePaint"
    :linkColor="() => 'rgba(255,255,255,.2)'"
  ></VueForceGraph2D>
</template>