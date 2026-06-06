<template>
  <ForceGraphAR
    ref="graph"
    node-auto-color-by="group"
    :gl-scale="160"
    :y-offset="1.8"
    :node-rel-size="5"
    :link-with="1.5"
    :node-opacity="0.9"
    :link-opacity="0.3"
    :link-color="() => 'darkgrey'"
  ></ForceGraphAR>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { ForceGraphARExpose } from "vue-force-graph-ar";
let graph = ref<ForceGraphARExpose | null>(null);
onMounted(() => {
  graph.value?.jsonUrl("/vue-force-graph/ar/miserables.json");
});
</script>
