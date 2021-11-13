<script lang="ts">
import { ref, defineComponent } from "vue";
import SpriteText from "three-spritetext";

export default defineComponent({
  setup() {
    const graphData = ref({
      nodes: [],
      links: [],
    });
    function linkThreeObject(link) {
      // extend link with text sprite
      const sprite = new SpriteText(`${link.source} > ${link.target}`);
      sprite.color = "lightgrey";
      sprite.textHeight = 1.5;
      return sprite;
    }
    fetch("/miserables.json")
      .then((res) => res.json())
      .then((data) => (graphData.value = data));
    return {
      graphData,
      linkThreeObject,
    };
  },
});
</script>
<template>
  <VueForceGraph3D
    :graphData="graphData"
    backgroundColor="#090723"
    nodeLabel="id"
    nodeAutoColorBy="group"
    :linkThreeObjectExtend="true"
    :linkThreeObject="linkThreeObject"
    :linkPositionUpdate="
      (sprite, { start, end }) => {
        const middlePos = Object.assign(
          ...['x', 'y', 'z'].map((c) => ({
            [c]: start[c] + (end[c] - start[c]) / 2, // calc middle point
          }))
        );

        // Position sprite
        Object.assign(sprite.position, middlePos);
      }
    "
  ></VueForceGraph3D>
</template>