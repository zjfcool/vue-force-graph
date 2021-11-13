<script setup lang="ts">
import { ref } from "vue";
import { genRandomTree } from "../utils";
const graphData = ref(genRandomTree(40));
</script>
<template>
  <VueForceGraph3D
    :graphData="graphData"
    :linkDirectionalArrowLength="3.5"
    :linkDirectionalArrowRelPos="1"
    :linkCurvature="0.25"
    backgroundColor="#090723"
  ></VueForceGraph3D>
</template>