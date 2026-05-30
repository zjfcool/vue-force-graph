<template>
  <ForceGraph2D
    :graph-data="graphData"
    :link-directional-arrow-length="8"
    :link-color="linkColorHandle"
  >
  </ForceGraph2D>
</template>
<script setup lang="ts">
import { genRandomTree } from "@/utils";
const graphData = genRandomTree();
const linkColorHandle = () => "rgba(255,255,255,0.2)";
</script>
