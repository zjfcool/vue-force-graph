<script setup lang="ts">
import { ref } from "vue";
import { genRandomTree } from "../utils";
const graphData = ref(genRandomTree());
</script>
<template>
  <VueForceGraph3D
    :graphData="graphData"
    backgroundColor="#090723"
  ></VueForceGraph3D>
</template>