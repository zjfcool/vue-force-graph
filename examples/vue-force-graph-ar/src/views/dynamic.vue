<template>
  <ForceGraphAR
    :graph-data="graphData"
    :enable-node-drag="false"
    @node-click="removeNode"
    :node-rel-size="10"
    :link-width="3"
    :node-opacity="0.9"
    :link-opacity="0.4"
    :node-color="nodeColorHandle"
    :link-color="linkColorHandle"
  ></ForceGraphAR>
</template>
<script setup lang="ts">
import { onBeforeUnmount, onMounted, shallowRef } from "vue";
import type { ForceGraphARData, ForceGraphARNodeObject } from "vue-force-graph-ar";
const graphData = shallowRef<ForceGraphARData>({
  nodes: [{ id: 0 }],
  links: [],
});
const nodeColorHandle = () => "firebrick";
const linkColorHandle = () => "darkgrey";

let pre = Date.now();
let frameId: number;
function tick() {
  const now = Date.now();
  if (now - pre > 1000) {
    pre = now;
    const { nodes, links } = graphData.value;
    const id = nodes.length;
    graphData.value = {
      nodes: [...nodes, { id }],
      links: [...links, { source: id, target: Math.round(Math.random() * (id - 1)) }],
    };
  }
  frameId = requestAnimationFrame(tick);
}

onMounted(() => {
  frameId = requestAnimationFrame(tick);
});
onBeforeUnmount(() => {
  cancelAnimationFrame(frameId);
});

function removeNode(node: ForceGraphARNodeObject) {
  let { nodes, links } = graphData.value;
  links = links.filter((l) => l.source !== node && l.target !== node); // Remove links attached to node
  nodes.splice(node.id as number, 1); // Remove node
  nodes.forEach((n, idx) => {
    n.id = idx;
  }); // Reset node ids to array index
  graphData.value = { nodes, links };
}
</script>
