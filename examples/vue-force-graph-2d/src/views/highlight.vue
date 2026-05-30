<template>
  <ForceGraph2D
    :graph-data="graphData"
    :auto-pause-redraw="false"
    :node-rel-size="NODE_R"
    :link-width="linkWidthHandle"
    :link-directional-particles="4"
    :link-directional-particle-width="linkDirectionalParticleWidthHandle"
    :node-canvas-object-mode="nodeCanvasObjectModeHandle"
    :node-canvas-object="nodeCanvasObjectHandle"
    @node-hover="nodeHoverHandle"
    @link-hover="linkHoverHandle"
    :link-color="linkColorHandle"
  >
  </ForceGraph2D>
</template>
<script setup lang="ts">
import type { ForceGraph2DLinkObject, ForceGraph2DNodeObject } from "vue-force-graph-2d";

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
const linkColorHandle = () => "rgba(255,255,255,0.2)";

// cross-link node objects
graphData.links.forEach((link) => {
  const a = graphData.nodes[link.source] as ForceGraph2DNodeObject;
  const b = graphData.nodes[link.target] as ForceGraph2DNodeObject;
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
let hoverNode: ForceGraph2DNodeObject | null = null;

const nodeHoverHandle = (node: ForceGraph2DNodeObject | null) => {
  highlightNodes.clear();
  highlightLinks.clear();
  if (node) {
    highlightNodes.add(node);
    node.neighbors.forEach((neighbor: ForceGraph2DNodeObject) => highlightNodes.add(neighbor));
    node.links.forEach((link: ForceGraph2DLinkObject) => highlightLinks.add(link));
  }

  hoverNode = node || null;
};
const linkHoverHandle = (link: ForceGraph2DLinkObject) => {
  highlightNodes.clear();
  highlightLinks.clear();

  if (link) {
    highlightLinks.add(link);
    highlightNodes.add(link.source);
    highlightNodes.add(link.target);
  }
};
const linkWidthHandle = (link: ForceGraph2DLinkObject) => (highlightLinks.has(link) ? 5 : 1);
const linkDirectionalParticleWidthHandle = (link: ForceGraph2DLinkObject) =>
  highlightLinks.has(link) ? 4 : 0;
const nodeCanvasObjectModeHandle = (node: ForceGraph2DNodeObject) =>
  highlightNodes.has(node) ? "before" : undefined;
const nodeCanvasObjectHandle = (node: ForceGraph2DNodeObject, ctx: CanvasRenderingContext2D) => {
  ctx.beginPath();
  ctx.arc(node.x!, node.y!, NODE_R * 1.4, 0, 2 * Math.PI, false);
  ctx.fillStyle = node === hoverNode ? "red" : "orange";
  ctx.fill();
};
</script>
