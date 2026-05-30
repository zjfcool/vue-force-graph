<template>
  <ForceGraph2D :graph-data="graphData" @node-click="removeNode" :link-color="linkColorHandle">
  </ForceGraph2D>
</template>
<script setup lang="ts">
import { shallowRef } from "vue";
import type {
  ForceGraph2DData,
  ForceGraph2DLinkObject,
  ForceGraph2DNodeObject,
} from "vue-force-graph-2d";
const graphData = shallowRef<ForceGraph2DData>({
  nodes: [{ id: 0 }],
  links: [],
});
const linkColorHandle = () => "rgba(255,255,255,0.2)";
let a = Date.now();
function updateGraph() {
  const b = Date.now();
  if (b - a > 200) {
    a = b;
    const { nodes, links } = graphData.value;
    const id = nodes.length;
    graphData.value = {
      nodes: [...nodes, { id }],
      links: [...links, { source: id, target: Math.round(Math.random() * (id - 1)) }],
    };
  }
  requestAnimationFrame(updateGraph);
}
requestAnimationFrame(updateGraph);
function removeNode(node: ForceGraph2DNodeObject) {
  let { nodes, links } = graphData.value;
  links = links.filter((l: ForceGraph2DLinkObject) => l.source !== node && l.target !== node); // Remove links attached to node
  nodes.splice(node.id as number, 1); // Remove node
  nodes.forEach((n: ForceGraph2DNodeObject, idx: number) => {
    n.id = idx;
  }); // Reset node ids to array index
  graphData.value = { nodes, links };
}
</script>
