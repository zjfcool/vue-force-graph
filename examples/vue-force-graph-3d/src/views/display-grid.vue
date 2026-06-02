<template>
  <ul class="graph-grid">
    <li class="graph-item" v-for="{ id, ...attrs } in graphDataList" :key="id">
      <ForceGraph3D style="width: 100%; height: 100%" v-bind="attrs"></ForceGraph3D>
    </li>
  </ul>
</template>
<script setup lang="ts">
import * as THREE from "three";
// @ts-ignore
import SpriteText from "https://esm.sh/three-spritetext";
import type {
  ForceGraph3DData,
  ForceGraph3DLinkObject,
  ForceGraph3DNodeObject,
} from "vue-force-graph-3d";
import { onMounted, shallowRef } from "vue";

function genRandomTree(N = 300, reverse = false) {
  return {
    nodes: [...Array(N).keys()].map((i) => ({ id: i, group: Math.ceil(Math.random() * 12) })),
    links: [...Array(N).keys()]
      .filter((id) => id)
      .map((id) => ({
        [reverse ? "target" : "source"]: id,
        [reverse ? "source" : "target"]: Math.round(Math.random() * (id - 1)),
      })),
  };
}
const nodeThreeObjectHandle = (node: ForceGraph3DNodeObject) => {
  const sprite = new SpriteText(node.id);
  sprite.material.depthWrite = false; // make sprite background transparent
  sprite.color = node.color;
  sprite.textHeight = 8;
  sprite.center.y = -0.6; // shift above node
  return sprite;
};
const nodeThreeObjectHandle2 = ({ id }: ForceGraph3DNodeObject) =>
  new THREE.Mesh(
    [
      new THREE.BoxGeometry(Math.random() * 20, Math.random() * 20, Math.random() * 20),
      new THREE.ConeGeometry(Math.random() * 10, Math.random() * 20),
      new THREE.CylinderGeometry(Math.random() * 10, Math.random() * 10, Math.random() * 20),
      new THREE.DodecahedronGeometry(Math.random() * 10),
      new THREE.SphereGeometry(Math.random() * 10),
      new THREE.TorusGeometry(Math.random() * 10, Math.random() * 2),
      new THREE.TorusKnotGeometry(Math.random() * 10, Math.random() * 2),
    ][(id as number) % 7],
    new THREE.MeshLambertMaterial({
      color: Math.round(Math.random() * Math.pow(2, 24)),
      transparent: true,
      opacity: 0.75,
    }),
  );
const nodeLabelHandle = (node: ForceGraph3DNodeObject) => `${node.user}: ${node.description}`;
const nodeClickHandle = (node: ForceGraph3DNodeObject) =>
  window.open(`https://bl.ocks.org/${node.user}/${node.id}`, "_blank");
const graphDataList = shallowRef([
  {
    id: 0,
    graphData: genRandomTree(),
    nodeThreeObject: nodeThreeObjectHandle2,
    nodeThreeObjectExtend: true,
    nodeAutoColorBy: "id",
  },
  {
    id: 1,
    graphData: undefined,
    nodeAutoColorBy: "user",
    nodeLabel: nodeLabelHandle,
    onNodeClick: nodeClickHandle,
  },
  {
    id: 2,
    graphData: genRandomTree(),
    linkAutoColorBy: (d: ForceGraph3DLinkObject) =>
      (graphDataList.value[2].graphData as ForceGraph3DData).nodes[d.source as number].group,
    linkWidth: 5,
  },
  {
    id: 3,
    graphData: genRandomTree(300, true),
    nodeThreeObject: nodeThreeObjectHandle,
    nodeThreeObjectExtend: true,
    nodeAutoColorBy: "id",
  },
]);
onMounted(async () => {
  const res = await fetch("/vue-force-graph/3d/blocks.json");
  graphDataList.value[1].graphData = await res.json();
  graphDataList.value = [...graphDataList.value];
});
</script>
<style scoped>
.graph-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
.graph-item {
  position: relative;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
}
</style>
