<template>
  <!-- <VueForceGraph3D :graphData="graphData"></VueForceGraph3D> -->
  <!-- <VueForceGraph2D :graphData="graphData"></VueForceGraph2D> -->
  <VueForceGraphAR :graphData="graphData"></VueForceGraphAR>
</template>
<script lang="ts">
// @ts-ignore
// import VueForceGraph3D from "@vue-force-graph/3d";
import { defineComponent, reactive, toRefs } from "vue";
function genRandomTree(N = 300, reverse = false) {
  return {
    nodes: [...Array(N).keys()].map((i) => ({ id: i })),
    links: [...Array(N).keys()]
      .filter((id) => id)
      .map((id) => ({
        [reverse ? "target" : "source"]: id,
        [reverse ? "source" : "target"]: Math.round(Math.random() * (id - 1)),
      })),
  };
}
export default defineComponent({
  components: {
    // VueForceGraph3D,
  },
  setup() {
    const state = reactive({
      graphData: genRandomTree(),
    });
    return {
      ...toRefs(state),
    };
  },
});
</script>
