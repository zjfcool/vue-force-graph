<script setup lang="ts">
import { ref } from "vue";
import { VueForceGraphVR } from "vue-force-graph/es/components/vue-force-graph-vr";
import { genRandomTree } from "../utils";
const graphData = ref(genRandomTree(100));
</script>
<template>
  <VueForceGraphVR
    :graphData="graphData"
    backgroundColor="#090723"
  ></VueForceGraphVR>
</template>