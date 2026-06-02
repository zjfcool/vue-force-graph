<template>
  <ForceGraph2D
    ref="graph"
    node-id="id"
    node-label="id"
    node-auto-color-by="group"
    :graph-data="graphData"
    :link-canvas-object-mode="linkCanvasObjectModeHandle"
    :link-canvas-object="linkCanvasObjectHandle"
    :link-color="linkColorHandle"
  >
  </ForceGraph2D>
</template>
<script setup lang="ts">
import { ref, shallowRef } from "vue";
import type {
  ForceGraph2DExpose,
  ForceGraph2DData,
  ForceGraph2DLinkObject,
} from "vue-force-graph-2d";

const graph = ref<ForceGraph2DExpose>();
const graphData = shallowRef<ForceGraph2DData>();
const linkCanvasObjectModeHandle = () => "after";
const linkColorHandle = () => "rgba(255,255,255,0.2)";
const linkCanvasObjectHandle = (link: ForceGraph2DLinkObject, ctx: CanvasRenderingContext2D) => {
  const MAX_FONT_SIZE = 4;
  const LABEL_NODE_MARGIN = (graph.value?.nodeRelSize() as number) * 1.5;

  const start = link.source;
  const end = link.target;

  // ignore unbound links
  if (typeof start !== "object" || typeof end !== "object") return;
  let textPos: { x: number; y: number } = { x: 0, y: 0 };
  ["x", "y"].forEach((c: string) => {
    textPos[c as "x" | "y"] = start[c]! + (end[c]! - start[c]!) / 2;
  });
  // calculate label positionin

  const relLink = { x: end.x! - start.x!, y: end.y! - start.y! };

  const maxTextLength =
    Math.sqrt(Math.pow(relLink.x, 2) + Math.pow(relLink.y, 2)) - LABEL_NODE_MARGIN * 2;

  let textAngle = Math.atan2(relLink.y, relLink.x);
  // maintain label vertical orientation for legibility
  if (textAngle > Math.PI / 2) textAngle = -(Math.PI - textAngle);
  if (textAngle < -Math.PI / 2) textAngle = -(-Math.PI - textAngle);

  const label = `${start.id} > ${end.id}`;

  // estimate fontSize to fit in link length
  ctx.font = "1px Sans-Serif";
  const fontSize = Math.min(MAX_FONT_SIZE, maxTextLength / ctx.measureText(label).width);
  ctx.font = `${fontSize}px Sans-Serif`;
  const textWidth = ctx.measureText(label).width;
  const bckgDimensions = [textWidth, fontSize].map((n) => n + fontSize * 0.2); // some padding

  // draw text label (with background rect)
  ctx.save();
  ctx.translate(textPos.x, textPos.y);
  ctx.rotate(textAngle);

  ctx.fillStyle = "#212140ab";
  ctx.fillRect(
    -bckgDimensions[0] / 2,
    -bckgDimensions[1] / 2,
    ...(bckgDimensions as [number, number]),
  );

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.fillText(label, 0, 0);
  ctx.restore();
};

fetch("/vue-force-graph/2d/miserables.json")
  .then((res) => res.json())
  .then((data) => {
    graphData.value = data;
  });
</script>
