<template>
  <ForceGraph2D
    :graph-data="graphData"
    :node-rel-size="8"
    :link-width="3"
    :link-line-dash="linkLineDashHandle"
    :link-color="linkColorHandle"
  >
  </ForceGraph2D>
</template>
<script setup lang="ts">
import { shallowRef } from "vue";
const linkLineDashHandle = shallowRef((link: any) => link.dashed && [dashLen, gapLen]);
// Random tree
const N = 500;
const graphData = {
  nodes: [...Array(N).keys()].map((i) => ({ id: i })),
  links: [...Array(N).keys()]
    .filter((id) => id)
    .map((id) => ({
      source: id,
      target: Math.round(Math.random() * (id - 1)),
      dashed: id % 2 === 0,
    })),
};

const dashLen = 6;
const gapLen = 8;
// Dash animation
const st = +new Date();
const dashAnimateTime = 300; // time to animate a single dash
(function animate() {
  const t = ((+new Date() - st) % dashAnimateTime) / dashAnimateTime;
  const lineDash =
    t < 0.5
      ? [0, gapLen * t * 2, dashLen, gapLen * (1 - t * 2)]
      : [dashLen * (t - 0.5) * 2, gapLen, dashLen * (1 - (t - 0.5) * 2), 0];
  linkLineDashHandle.value = (link: any) => link.dashed && lineDash;

  requestAnimationFrame(animate);
})(); // IIFE
const linkColorHandle = () => "rgba(255,255,255,0.2)";
</script>
