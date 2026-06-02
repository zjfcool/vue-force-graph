<template>
  <ForceGraph3D
    ref="graph"
    background-color="#101020"
    :graph-data="graphData"
    :node-color="nodeColorHandle"
    :link-three-object="linkThreeObjectHandle"
    :link-position-update="linkPositionUpdateHandle"
  ></ForceGraph3D>
</template>
<script setup lang="ts">
import * as THREE from "three";
// @ts-ignore
import { scaleOrdinal, schemeRdYlGn, color as d3Color } from "https://esm.sh/d3";
import type {
  ForceGraph3DLinkObject,
  ForceGraph3DNodeObject,
  ForceGraph3DExpose,
} from "vue-force-graph-3d";
import { ref } from "vue";
type Coords = { x: number; y: number; z: number };
type Dimension = "x" | "y" | "z";
const graph = ref<ForceGraph3DExpose>();

// Random tree
const N = 25;
const graphData = {
  nodes: [...Array(N).keys()].map((i) => ({ id: i })),
  links: [...Array(N).keys()]
    .filter((id) => id)
    .map((id) => ({
      source: id,
      target: Math.round(Math.random() * (id - 1)),
    })),
};

const nodeColorScale = scaleOrdinal(schemeRdYlGn[4]);
const nodeColorHandle = (node: ForceGraph3DNodeObject) => nodeColorScale(node.id);
const linkThreeObjectHandle = (link: ForceGraph3DLinkObject) => {
  // 2 (nodes) x 3 (r+g+b) bytes between [0, 1]
  // For example:
  // new Float32Array([
  //   1, 0, 0,  // source node: red
  //   0, 1, 0   // target node: green
  // ]);
  const colors = new Float32Array(
    [link.source, link.target]
      .map(nodeColorScale)
      .map(d3Color)
      .map(({ r, g, b }: any) => [r, g, b].map((v) => v / 255))
      .flat(),
  );

  const material = new THREE.LineBasicMaterial({ vertexColors: true });
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(2 * 3), 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  return new THREE.Line(geometry, material);
};
const linkPositionUpdateHandle = (line: any, { start, end }: { start: Coords; end: Coords }) => {
  const startR = graph.value?.nodeRelSize();
  const endR = graph.value?.nodeRelSize();
  const lineLen = Math.sqrt(
    ["x", "y", "z"]
      .map((dim: string) =>
        Math.pow((end[dim as Dimension] || 0) - (start[dim as Dimension] || 0), 2),
      )
      .reduce((acc, v) => acc + v, 0),
  );

  const linePos = line.geometry.getAttribute("position");

  // calculate coordinate on the node's surface instead of center
  linePos.set(
    [startR! / lineLen, 1 - endR! / lineLen]
      .map((t) =>
        ["x", "y", "z"].map(
          (dim: string) =>
            start[dim as Dimension] + (end[dim as Dimension] - start[dim as Dimension]) * t,
        ),
      )
      .flat(),
  );
  linePos.needsUpdate = true;
  return true;
};
</script>
