<script lang="ts">
import { ref, defineComponent } from "vue";
import { DATA_URL } from "../../config/base.config";
export default defineComponent({
  setup() {
    const graphData = ref({
      nodes: [],
      links: [],
    });
    fetch(DATA_URL)
      .then((res) => res.json())
      .then((data) => (graphData.value = data));
    return {
      graphData,
    };
  },
});
</script>
<template>
  <VueForceGraph3D
    :graphData="graphData"
    backgroundColor="#090723"
    nodeLabel="id"
    nodeAutoColorBy="group"
    :onNodeDragEnd="
      (node) => {
        node.fx = node.x;
        node.fy = node.y;
        node.fz = node.z;
      }
    "
  ></VueForceGraph3D>
</template>
