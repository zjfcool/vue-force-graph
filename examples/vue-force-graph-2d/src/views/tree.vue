<template>
  <ForceGraph2D
    :graph-data="graphData"
    :dag-mode="dagMode"
    :dag-level-distance="300"
    :link-color="linkColorHandle"
    :node-rel-size="NODE_REL_SIZE"
    node-id="path"
    :node-val="nodeValHandle"
    node-auto-color-by="module"
    :link-directional-particles="2"
    :link-directional-particle-width="2"
    :d3-velocity-decay="0.3"
  ></ForceGraph2D>
</template>
<script setup lang="ts">
// @ts-ignore
import { csvParse } from "https://esm.sh/d3-dsv";
// @ts-ignore
import { forceCollide } from "https://esm.sh/d3-force";
// @ts-ignore
import { GUI } from "https://esm.sh/dat.gui";
import type {
  ForceGraph2DDagMode,
  ForceGraph2DData,
  ForceGraph2DNodeObject,
  ForceGraph2DExpose,
  ForceGraph2DLinkObject,
} from "vue-force-graph-2d";
import { ref, shallowRef, onMounted, onBeforeUnmount } from "vue";
const linkColorHandle = () => "rgba(255,255,255,0.2)";
const graphData = shallowRef<ForceGraph2DData>();
const dagMode = shallowRef<ForceGraph2DDagMode>("td");
const graph = ref<ForceGraph2DExpose>();
const nodeValHandle = (node: ForceGraph2DNodeObject) => 100 / (node.level + 1);

// controls
const controls = { "DAG Orientation": dagMode.value };
const gui = new GUI();
gui
  .add(controls, "DAG Orientation", ["td", "bu", "lr", "rl", "radialout", "radialin", null])
  .onChange((orientation: ForceGraph2DDagMode) => (dagMode.value = orientation));

// graph config
const NODE_REL_SIZE = 1;

onMounted(() => {
  graph.value?.d3Force(
    "collision",
    forceCollide(
      (node: ForceGraph2DNodeObject) => Math.sqrt(100 / (node.level + 1)) * NODE_REL_SIZE,
    ),
  );
});
onBeforeUnmount(() => {
  gui.destroy();
});

fetch("/vue-force-graph-2d/d3-dependencies.csv")
  .then((r) => r.text())
  .then(csvParse)
  .then((data) => {
    const nodes: ForceGraph2DNodeObject[] = [],
      links: ForceGraph2DLinkObject[] = [];
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
</script>
