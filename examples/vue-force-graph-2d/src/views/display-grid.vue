<template>
  <ul class="graph-grid">
    <li class="graph-item" v-for="{ id, ...attrs } in graphDataList" :key="id">
      <ForceGraph2D
        :ref="id === 4 ? setCircleGraph : undefined"
        background-color="#000011"
        :link-color="linkColorHandle"
        style="width: 100%; height: 100%"
        v-bind="attrs"
      ></ForceGraph2D>
    </li>
  </ul>
</template>
<script setup lang="ts">
import { type ForceGraph2DNodeObject, type ForceGraph2DExpose } from "vue-force-graph-2d";
import { onMounted, ref, shallowRef } from "vue";
import { genRandomTree } from "@/utils";
import { forceCollide, forceRadial } from "d3-force";
const circleGraph = ref<ForceGraph2DExpose>();
function setCircleGraph(el: any) {
  circleGraph.value = el;
}
const curveGraphData = {
  nodes: [...Array(9).keys()].map((i) => ({ id: i })),
  links: [
    { source: 1, target: 4, curvature: 0 },
    { source: 1, target: 4, curvature: 0.5 },
    { source: 1, target: 4, curvature: -0.5 },
    { source: 5, target: 2, curvature: 0.3 },
    { source: 2, target: 5, curvature: 0.3 },
    { source: 0, target: 3, curvature: 0 },
    { source: 3, target: 3, curvature: 0.5 },
    { source: 0, target: 4, curvature: 0.2 },
    { source: 4, target: 5, curvature: 0.5 },
    { source: 5, target: 6, curvature: 0.7 },
    { source: 6, target: 7, curvature: 1 },
    { source: 7, target: 8, curvature: 2 },
    { source: 8, target: 0, curvature: 0.5 },
  ],
};
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
  img.src = `/vue-force-graph/2d/imgs/${src}`;
  return img;
});
const imgNodeCanvasObjectHandle = (
  { x, y, img }: ForceGraph2DNodeObject,
  ctx: CanvasRenderingContext2D,
) => {
  const size = 12;
  ctx.drawImage(img, x! - size / 2, y! - size / 2, size, size);
};
const imgNodePointerAreaPaintHandle = (
  node: ForceGraph2DNodeObject,
  color: string,
  ctx: CanvasRenderingContext2D,
) => {
  const size = 12;
  ctx.fillStyle = color;
  ctx.fillRect(node.x! - size / 2, node.y! - size / 2, size, size); // draw square as pointer trap
};
// Random connected graph
const imgGraphData = {
  nodes: imgs.map((img, id) => ({ id, img })),
  links: [...Array(imgs.length).keys()]
    .filter((id) => id)
    .map((id) => ({
      source: id,
      target: Math.round(Math.random() * (id - 1)),
    })),
};

const linkColorHandle = () => "rgba(255,255,255,0.2)";
const getColor = (n: number) =>
  "#" + ((n * 1234567) % Math.pow(2, 24)).toString(16).padStart(6, "0");
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
function customNodeCanvasObjectHandle(node: ForceGraph2DNodeObject, ctx: CanvasRenderingContext2D) {
  nodePaint(node, getColor(Number(node.id)), ctx);
}
function circleGraphResizeHandle({ width, height }: { width: number; height: number }) {
  const cg = circleGraph.value;
  const minW = Math.min(width, height);

  cg?.d3Force("center", null)
    .d3Force("charge", null)
    .d3Force("collide", forceCollide(4))
    .d3Force(
      "r",
      forceRadial(minW / 2)
        .x(0)
        .y(0)
        .strength(0.2),
    )
    .zoom(0.9);
  cg?.d3ReheatSimulation();
}

const graphDataList = shallowRef([
  {
    id: 0,
    graphData: curveGraphData,
    linkDirectionalParticles: 2,
    linkCurvature: "curvature",
  },
  {
    id: 1,
    graphData: undefined,
    nodeAutoColorBy: "user",
  },

  {
    id: 2,
    graphData: imgGraphData,
    nodeCanvasObject: imgNodeCanvasObjectHandle,
    nodePointerAreaPaint: imgNodePointerAreaPaintHandle,
  },
  {
    id: 3,
    graphData: genRandomTree(300),
    nodeAutoColorBy: "id",
  },
  {
    id: 4,
    graphData: { ...genRandomTree(300, true), links: [] },
    onResize: circleGraphResizeHandle,
  },
  {
    id: 5,
    graphData: genRandomTree(),
    nodeCanvasObject: customNodeCanvasObjectHandle,
    nodePointerAreaPaint: nodePaint,
    nodeLabel: "id",
  },
]);
onMounted(async () => {
  const res = await fetch("/vue-force-graph/2d/blocks.json");
  graphDataList.value[1].graphData = await res.json();
  graphDataList.value = [...graphDataList.value];
});
</script>
<style scoped>
.graph-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0;
  /* background-color: #090912; */
}
.graph-item {
  position: relative;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
}
</style>
