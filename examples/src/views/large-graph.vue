<script setup lang="ts">
import { onBeforeUpdate } from "vue";
import { onUpdated } from "vue";
import { onMounted } from "vue";
import { ref } from "vue";
import { BLOCK_DATA_URL } from "../../config/base.config";
const graphData = ref({
  nodes: [],
  links: [],
});
function formatData(data, num = 400) {
  const links = data.links.slice(0, num);
  const nodes = data.nodes.filter((node) => {
    if (
      links.find((link) => node.id === link.target || node.id === link.source)
    )
      return true;
    else return false;
  });
  return {
    nodes,
    links,
  };
}
onBeforeUpdate(() => {
  console.log("beforeupdate");
});
onUpdated(() => {
  console.log("updated");
});
onMounted(() => {
  console.log("mouted");
  fetch(BLOCK_DATA_URL)
    .then((res) => res.json())
    .then((data) => (graphData.value = formatData(data)));
});
</script>
<template>
  <VueForceGraph3D
    v-if="graphData.nodes.length"
    :graphData="graphData"
    backgroundColor="#090723"
    :nodeLabel="(node) => `${node.user}: ${node.description}`"
    nodeAutoColorBy="user"
    :linkDirectionalParticles="1"
  ></VueForceGraph3D>
</template>