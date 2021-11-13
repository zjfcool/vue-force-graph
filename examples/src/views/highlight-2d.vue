<script setup lang="ts">
import { ref } from "vue";
import { genRandomTree } from "../utils";
function genData() {
  const data = genRandomTree(40);
  data.links.forEach((link) => {
    const a = data.nodes[link.source] as any;
    const b = data.nodes[link.target] as any;
    !a.neighbors && (a.neighbors = []);
    !b.neighbors && (b.neighbors = []);
    a.neighbors.push(b);
    b.neighbors.push(a);

    !a.links && (a.links = []);
    !b.links && (b.links = []);
    a.links.push(link);
    b.links.push(link);
  });
  return data;
}
const NODE_R = 8;
const graphData = ref(genData());
const highlightNodes = ref(new Set());
const highlightLinks = ref(new Set());
const hoverNode = ref(null);
const handleNodeHover = (node) => {
  highlightNodes.value.clear();
  highlightLinks.value.clear();
  if (node) {
    highlightNodes.value.add(node);
    node.neighbors.forEach((neighbor) => highlightNodes.value.add(neighbor));
    node.links.forEach((link) => highlightLinks.value.add(link));
  }
  hoverNode.value = node || null;
};
const handleLinkHover = (link) => {
  highlightNodes.value.clear();
  highlightLinks.value.clear();
  if (link) {
    highlightLinks.value.add(link);
    highlightNodes.value.add(link.source);
    highlightNodes.value.add(link.target);
  }
};
const handleLinkWidth = (link) => (highlightLinks.value.has(link) ? 5 : 1);
const handleLinkDirectionalParticleWidth = (link) =>
  highlightLinks.value.has(link) ? 4 : 0;
const handleNodeCanvasObjectMode = (node) =>
  highlightNodes.value.has(node) ? "before" : undefined;
const paintRing = (node, ctx) => {
  // add ring just for highlighted nodes
  ctx.beginPath();
  ctx.arc(node.x, node.y, NODE_R * 1.4, 0, 2 * Math.PI, false);
  ctx.fillStyle = node === hoverNode.value ? "red" : "orange";
  ctx.fill();
};
</script>
<template>
  <VueForceGraph2D
    :graphData="graphData"
    :nodeRelSize="NODE_R"
    :autoPauseRedraw="false"
    :linkWidth="handleLinkWidth"
    :linkDirectionalParticles="4"
    :linkDirectionalParticleWidth="handleLinkDirectionalParticleWidth"
    :nodeCanvasObjectMode="handleNodeCanvasObjectMode"
    :nodeCanvasObject="paintRing"
    :onNodeHover="handleNodeHover"
    :onLinkHover="handleLinkHover"
    backgroundColor="#090723"
    :linkColor="() => 'rgba(255,255,255,0.2)'"
  ></VueForceGraph2D>
</template>