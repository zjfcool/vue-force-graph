<template>
  <ForceGraph2D
    :graph-data="graphData"
    node-id="id"
    node-auto-color-by="group"
    :node-canvas-object="nodeCanvasObjectHandle"
    :node-pointer-area-paint="nodePointerAreaPaintHandle"
    :link-color="linkColorHandle"
  >
  </ForceGraph2D>
</template>
<script setup lang="ts">
import { shallowRef } from "vue";
import type { ForceGraph2DData, ForceGraph2DNodeObject } from "vue-force-graph-2d";

const graphData = shallowRef<ForceGraph2DData>();
const linkColorHandle = () => "rgba(255,255,255,0.2)";
const nodeCanvasObjectHandle = (
  node: ForceGraph2DNodeObject,
  ctx: CanvasRenderingContext2D,
  globalScale: number,
) => {
  const label = String(node.id);
  const fontSize = 12 / globalScale;
  ctx.font = `${fontSize}px Sans-Serif`;
  const textWidth = ctx.measureText(label).width;
  const bckgDimensions = [textWidth, fontSize].map((n) => n + fontSize * 0.2); // some padding

  ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
  ctx.fillRect(
    node.x! - bckgDimensions[0] / 2,
    node.y! - bckgDimensions[1] / 2,
    ...(bckgDimensions as [number, number]),
  );

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = node.color;
  ctx.fillText(label, node.x!, node.y!);

  node.__bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint
};
const nodePointerAreaPaintHandle = (
  node: ForceGraph2DNodeObject,
  color: string,
  ctx: CanvasRenderingContext2D,
) => {
  ctx.fillStyle = color;
  const bckgDimensions = node.__bckgDimensions;
  if (bckgDimensions) {
    ctx.fillRect(
      node.x! - bckgDimensions[0] / 2,
      node.y! - bckgDimensions[1] / 2,
      ...(bckgDimensions as [number, number]),
    );
  }
};

fetch("/vue-force-graph-2d/miserables.json")
  .then((res) => res.json())
  .then((data) => {
    graphData.value = data;
  });
</script>
