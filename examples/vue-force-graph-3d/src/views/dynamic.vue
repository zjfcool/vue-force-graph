<template>
  <NoteMessage>
    <template #note> Click node to remove it </template>
    <ForceGraph3D
      background-color="#101020"
      :graph-data="graphData"
      :enable-node-drag="false"
      @node-click="removeNode"
    ></ForceGraph3D>
  </NoteMessage>
</template>
<script setup lang="ts">
import NoteMessage from "@/components/NoteMessage.vue";
import { onBeforeUnmount, onMounted, shallowRef } from "vue";
import type { ForceGraph3DData, ForceGraph3DNodeObject } from "vue-force-graph-3d";
const graphData = shallowRef<ForceGraph3DData>({
  nodes: [{ id: 0 }],
  links: [],
});

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

function removeNode(node: ForceGraph3DNodeObject) {
  let { nodes, links } = graphData.value;
  links = links.filter((l) => l.source !== node && l.target !== node); // Remove links attached to node
  nodes.splice(node.id as number, 1); // Remove node
  nodes.forEach((n, idx) => {
    n.id = idx;
  }); // Reset node ids to array index
  graphData.value = { nodes, links };
}
</script>
