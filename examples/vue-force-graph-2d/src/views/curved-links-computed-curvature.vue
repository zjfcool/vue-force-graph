<template>
  <ForceGraph2D
    :graph-data="graphData"
    link-curvature="curvature"
    :link-directional-arrow-length="4"
    :link-directional-arrow-rel-pos="1"
    :link-color="linkColorHandle"
  ></ForceGraph2D>
</template>
<script setup lang="ts">
import type { ForceGraph2DLinkObject } from "vue-force-graph-2d";

const graphData = {
  nodes: [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
  links: [
    { source: 0, target: 1 },
    { source: 0, target: 1 },
    { source: 1, target: 0 },
    { source: 1, target: 2 },
    { source: 2, target: 2 },
    { source: 2, target: 2 },
    { source: 2, target: 2 },
    { source: 2, target: 3 },
    { source: 3, target: 4 },
    { source: 4, target: 3 },
  ],
};

let selfLoopLinks: { [key: string]: ForceGraph2DLinkObject[] } = {};
let sameNodesLinks: { [key: string]: ForceGraph2DLinkObject[] } = {};
const curvatureMinMax = 0.5;
const linkColorHandle = () => "rgba(255,255,255,0.2)";

// 1. assign each link a nodePairId that combines their source and target independent of the links direction
// 2. group links together that share the same two nodes or are self-loops
graphData.links.forEach((link: ForceGraph2DLinkObject) => {
  link.nodePairId =
    link.source! <= link.target!
      ? link.source + "_" + link.target
      : link.target + "_" + link.source;
  let map = link.source === link.target ? selfLoopLinks : sameNodesLinks;
  if (!map[link.nodePairId]) {
    map[link.nodePairId] = [];
  }
  map[link.nodePairId].push(link);
});

// Compute the curvature for self-loop links to avoid overlaps
Object.keys(selfLoopLinks).forEach((id) => {
  let links = selfLoopLinks[id];
  let lastIndex = links.length - 1;
  links[lastIndex].curvature = 1;
  let delta = (1 - curvatureMinMax) / lastIndex;
  for (let i = 0; i < lastIndex; i++) {
    links[i].curvature = curvatureMinMax + i * delta;
  }
});

// Compute the curvature for links sharing the same two nodes to avoid overlaps
Object.keys(sameNodesLinks)
  .filter((nodePairId) => sameNodesLinks[nodePairId].length > 1)
  .forEach((nodePairId) => {
    let links = sameNodesLinks[nodePairId];
    let lastIndex = links.length - 1;
    let lastLink = links[lastIndex];
    lastLink.curvature = curvatureMinMax;
    let delta = (2 * curvatureMinMax) / lastIndex;
    for (let i = 0; i < lastIndex; i++) {
      links[i].curvature = -curvatureMinMax + i * delta;
      if (lastLink.source !== links[i].source) {
        links[i].curvature *= -1; // flip it around, otherwise they overlap
      }
    }
  });
</script>
