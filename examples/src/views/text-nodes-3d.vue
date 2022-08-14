<script setup lang="ts">
import { ref } from "vue";
import SpriteText from "three-spritetext";
import { DATA_URL } from "../../config/base.config";
const graphData = ref({
  nodes: [],
  links: [],
});
function spriteText(node) {
  const sprite = new SpriteText(node.id);
  sprite.color = node.color;
  sprite.textHeight = 8;
  return sprite;
}
fetch(DATA_URL)
  .then((res) => res.json())
  .then((data) => (graphData.value = data));
</script>
<template>
  <VueForceGraph3D
    v-if="graphData.nodes.length"
    :graphData="graphData"
    backgroundColor="#090723"
    nodeAutoColorBy="group"
    :nodeThreeObject="spriteText"
  ></VueForceGraph3D>
</template>
