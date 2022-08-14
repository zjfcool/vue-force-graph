<script lang="ts">
import { ref, defineComponent } from "vue";
import { DATA_URL } from "../../config/base.config";
import { genRandomTree } from "../utils";
export default defineComponent({
  setup() {
    let graphData = ref<any>({
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
  <VueForceGraph2D
    v-if="!graphData.length"
    :graphData="graphData"
    nodeLabel="id"
    nodeAutoColorBy="group"
    linkDirectionalParticles="value"
    :linkDirectionalParticleSpeed="(d) => d.value * 0.001"
    backgroundColor="#090723"
    :linkColor="() => 'rgba(255,255,255,.2)'"
  ></VueForceGraph2D>
</template>
