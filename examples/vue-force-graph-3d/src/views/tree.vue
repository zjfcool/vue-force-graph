<template>
  <ForceGraph3D
    ref="graph"
    :graph-data="graphData"
    background-color="#101020"
    :dag-level-distance="200"
    :dag-mode="dagMode"
    link-color="rgba(255,255,255,0.2)"
    :node-rel-size="NODE_REL_SIZE"
    node-id="path"
    node-val="size"
    node-auto-color-by="module"
    node-label="path"
    node-opacity="0.9"
    :link-directional-particles="2"
    :link-directional-particle-width="0.8"
    :link-directional-particle-speed="0.006"
    :d3-velocity-decay="0.3"
  ></ForceGraph3D>
</template>
<script setup lang="ts">
// @ts-ignore
import { csvParse } from "https://esm.sh/d3-dsv";
// @ts-ignore
import { forceCollide } from "https://esm.sh/d3-force-3d";
// @ts-ignore
import { GUI } from "https://esm.sh/dat.gui";
import { onBeforeUnmount, onMounted, ref } from "vue";
import type {
  ForceGraph3DDagMode,
  ForceGraph3DExpose,
  ForceGraph3DData,
  ForceGraph3DNodeObject,
  ForceGraph3DLinkObject,
} from "vue-force-graph-3d";
const graph = ref<ForceGraph3DExpose | null>(null);
const graphData = ref<ForceGraph3DData>();
const dagMode = ref<ForceGraph3DDagMode>("td");
// controls
const controls = { "DAG Orientation": "td" };
const gui = new GUI();
gui
  .add(controls, "DAG Orientation", [
    "td",
    "bu",
    "lr",
    "rl",
    "zout",
    "zin",
    "radialout",
    "radialin",
    null,
  ])
  .onChange((orientation: ForceGraph3DDagMode) => (dagMode.value = orientation));

// graph config
const NODE_REL_SIZE = 1;
fetch("/vue-force-graph/3d/d3-dependencies.csv")
  .then((r) => r.text())
  .then(csvParse)
  .then((data) => {
    const nodes: ForceGraph3DNodeObject[] = [],
      links: ForceGraph3DLinkObject[] = [];
    (data as unknown as any[]).forEach(({ size, path }) => {
      const levels = path.split("/"),
        level = levels.length - 1,
        module = level > 0 ? levels[1] : null,
        leaf = levels.pop(),
        parent = levels.join("/");

      const node = {
        path,
        leaf,
        module,
        size: +size || 20,
        level,
      };

      nodes.push(node);

      if (parent) {
        links.push({ source: parent, target: path, targetNode: node });
      }
    });

    graphData.value = { nodes, links };
  });

onMounted(() => {
  graph.value?.d3Force(
    "collision",
    forceCollide((node: ForceGraph3DNodeObject) => Math.cbrt(node.size) * NODE_REL_SIZE),
  );

  // Decrease repel intensity
  graph.value?.d3Force("charge")?.strength(-15);
});
onBeforeUnmount(() => {
  gui.destroy();
});
</script>
