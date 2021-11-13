<script lang="ts">
import { ref, onMounted, defineComponent } from "vue";
export default defineComponent({
  setup() {
    const graphData = ref({
      nodes: [],
      links: [],
    });
    const fgRef = ref();
    onMounted(() => {
      fetch("/miserables.json")
        .then((res) => res.json())
        .then((data) => (graphData.value = data));
    });
    const onHandleClick = (node) => {
      // Aim at node from outside it
      const distance = 40;
      const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

      fgRef.value.cameraPosition(
        { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
        node, // lookAt ({ x, y, z })
        3000 // ms transition duration
      );
    };
    return {
      graphData,
      fgRef,
      onHandleClick,
    };
  },
});
</script>
<template>
  <VueForceGraph3D
    ref="fgRef"
    :graphData="graphData"
    nodeLabel="id"
    nodeAutoColorBy="group"
    backgroundColor="#090723"
    :onNodeClick="onHandleClick"
  ></VueForceGraph3D>
</template>