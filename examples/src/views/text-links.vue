<script lang="ts">
import { ref, defineComponent } from "vue";
import SpriteText from "three-spritetext";
import { DATA_URL } from "../../config/base.config";

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
    fetch(DATA_URL)
      .then((res) => res.json())
      .then((data) => (graphData.value = data));
    const linkPositionUpdate = (sprite, { start, end }) => {
      const xyz = ["x", "y", "z"].map((c) => ({
        [c]: start[c] + (end[c] - start[c]) / 2, // calc middle point
      })) as [{ x: number }, { y: number }, { z: number }];
      const middlePos = Object.assign(...xyz);
      // Position sprite
      Object.assign(sprite.position, middlePos);
    };
    return {
      graphData,
      linkThreeObject,
      linkPositionUpdate,
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
    :linkPositionUpdate="linkPositionUpdate"
  ></VueForceGraph3D>
</template>
