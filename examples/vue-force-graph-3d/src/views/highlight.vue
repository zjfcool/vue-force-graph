<template>
  <ForceGraph3D
    ref="graph"
    background-color="#101020"
    :graph-data="graphData"
    :node-rel-size="NODE_R"
    :link-width="linkWidthHandle"
    :link-directional-particles="4"
    :link-directional-particle-width="linkDirectionalParticleWidthHandle"
    :node-color="nodeColorHandle"
    @node-hover="nodeHoverHandle"
    @link-hover="linkHoverHandle"
  >
  </ForceGraph3D>
</template>
<script setup lang="ts">
import type {
  ForceGraph3DLinkObject,
  ForceGraph3DNodeObject,
  // ForceGraph3DExpose,
} from "vue-force-graph-3d";

import { ref } from "vue";
// const graph = ref<ForceGraph3DExpose>();
// Random tree
const N = 80;
const graphData = {
  nodes: [...Array(N).keys()].map((i) => ({ id: i })),
  links: [...Array(N).keys()]
    .filter((id) => id)
    .map((id) => ({
      source: id,
      target: Math.round(Math.random() * (id - 1)),
    })),
};

// cross-link node objects
graphData.links.forEach((link) => {
  const a = graphData.nodes[link.source] as ForceGraph3DNodeObject;
  const b = graphData.nodes[link.target] as ForceGraph3DNodeObject;
  if (!a.neighbors) {
    a.neighbors = [];
  }
  if (!b.neighbors) {
    b.neighbors = [];
  }
  a.neighbors.push(b);
  b.neighbors.push(a);
  if (!a.links) {
    a.links = [];
  }
  if (!b.links) {
    b.links = [];
  }
  a.links.push(link);
  b.links.push(link);
});

const NODE_R = 8;

const highlightNodes = new Set();
const highlightLinks = new Set();
let hoverNode: ForceGraph3DNodeObject | null = null;
const nodeColorHandle = ref((node: ForceGraph3DNodeObject) =>
  highlightNodes.has(node)
    ? node === hoverNode
      ? "rgb(255,0,0,1)"
      : "rgba(255,160,0,0.8)"
    : "rgba(0,255,255,0.6)",
);

const nodeHoverHandle = (node: ForceGraph3DNodeObject) => {
  // no state change
  if ((!node && !highlightNodes.size) || (node && hoverNode === node)) return;

  highlightNodes.clear();
  highlightLinks.clear();
  if (node) {
    highlightNodes.add(node);
    node.neighbors.forEach((neighbor: ForceGraph3DNodeObject) => highlightNodes.add(neighbor));
    node.links.forEach((link: ForceGraph3DLinkObject) => highlightLinks.add(link));
  }

  hoverNode = node || null;

  updateHighlight();
};

const linkHoverHandle = (link: ForceGraph3DLinkObject) => {
  highlightNodes.clear();
  highlightLinks.clear();

  if (link) {
    highlightLinks.add(link);
    highlightNodes.add(link.source);
    highlightNodes.add(link.target);
  }
  updateHighlight();
};

const linkWidthHandle = ref((link: ForceGraph3DLinkObject) => (highlightLinks.has(link) ? 4 : 1));
const linkDirectionalParticleWidthHandle = (link: ForceGraph3DLinkObject) =>
  highlightLinks.has(link) ? 4 : 0;
function updateHighlight() {
  // 第一种方式
  nodeColorHandle.value = (node: ForceGraph3DNodeObject) =>
    highlightNodes.has(node)
      ? node === hoverNode
        ? "rgb(255,0,0,1)"
        : "rgba(255,160,0,0.8)"
      : "rgba(0,255,255,0.6)";
  linkWidthHandle.value = (link: ForceGraph3DLinkObject) => (highlightLinks.has(link) ? 4 : 1);
  // or 第二种方式
  // graph.value
  //   ?.nodeColor(graph.value?.nodeColor())
  //   .linkWidth(graph.value?.linkWidth())
  //   .linkDirectionalParticles(graph.value?.linkDirectionalParticles());
}
</script>
