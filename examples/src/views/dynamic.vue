<script lang="ts">
import { onMounted } from "vue";
import { ref, defineComponent } from "vue";
export default defineComponent({
  setup() {
    const graphData = ref({ nodes: [{ id: 0 }], links: [] });
    const dynamic = ({ nodes, links }) => {
      const id = nodes.length;
      return {
        nodes: [...nodes, { id }],
        links: [
          ...links,
          { source: id, target: Math.round(Math.random() * (id - 1)) },
        ],
      };
    };
    onMounted(() => {
      setInterval(() => {
        graphData.value = dynamic(graphData.value) as any;
      }, 1000);
    });

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
  ></VueForceGraph3D>
</template>