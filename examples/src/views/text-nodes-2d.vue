<script setup lang="ts">
import { ref } from "vue";
import { DATA_URL } from "../../config/base.config";
const graphData = ref({
  nodes: [],
  links: [],
});
fetch(DATA_URL)
  .then((res) => res.json())
  .then((data) => (graphData.value = data));
</script>
<template>
  <VueForceGraph2D
    :graphData="graphData"
    nodeAutoColorBy="group"
    backgroundColor="#090723"
    :linkColor="() => 'rgba(255,255,255,.2)'"
    :nodeCanvasObject="
      (node, ctx, globalScale) => {
        const label = node.id;
        const fontSize = 12 / globalScale;
        ctx.font = `${fontSize}px Sans-Serif`;
        const textWidth = ctx.measureText(label).width;
        const bckgDimensions = [textWidth, fontSize].map(
          (n) => n + fontSize * 0.2
        ); // some padding

        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(
          node.x - bckgDimensions[0] / 2,
          node.y - bckgDimensions[1] / 2,
          ...bckgDimensions
        );

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = node.color;
        ctx.fillText(label, node.x, node.y);

        node.__bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint
      }
    "
    :nodePointerAreaPaint="
      (node, color, ctx) => {
        ctx.fillStyle = color;
        const bckgDimensions = node.__bckgDimensions;
        bckgDimensions &&
          ctx.fillRect(
            node.x - bckgDimensions[0] / 2,
            node.y - bckgDimensions[1] / 2,
            ...bckgDimensions
          );
      }
    "
  />
</template>
