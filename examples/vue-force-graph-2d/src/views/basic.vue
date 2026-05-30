<template>
  <ForceGraph2D
    :graph-data="graphData"
    :link-directional-particles="2"
    :link-color="linkColorHandle"
  >
  </ForceGraph2D>
</template>
<script setup lang="ts">
import { genRandomTree } from "@/utils";
const graphData = genRandomTree(300);
const linkColorHandle = () => "rgba(255,255,255,0.2)";
</script>
