<script setup lang="ts">
import { ref } from "vue";
import { genRandomTree } from "../utils";
const graphData = ref(genRandomTree());
const GROUPS = 12;
</script>
<template>
  <VueForceGraph3D
    :graphData="graphData"
    backgroundColor="#090723"
    :nodeAutoColorBy="(d) => d.id % GROUPS"
    :linkAutoColorBy="(d) => graphData.nodes[d.source].id % GROUPS"
    :linkWidth="2"
  ></VueForceGraph3D>
</template>