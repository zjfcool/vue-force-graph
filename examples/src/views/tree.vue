<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as dat from "dat.gui";
import { csvParse } from "d3-dsv";
import { forceCollide } from "d3-force";
const fgRef = ref();
const controls = ref({
  "DAG Orientation": "td",
});
const guiCtx = ref();
const graphData = ref({
  nodes: [] as any[],
  links: [] as any[],
});
function addDatGUI() {
  const gui = new dat.GUI();
  guiCtx.value = gui;
  gui.add(controls.value, "DAG Orientation", [
    "td",
    "bu",
    "lr",
    "rl",
    "radialout",
    "radialin",
    null,
  ]);
  const dom = gui.domElement;
  dom.style.float = "left";
  dom.style.marginLeft = "24px";
  dom.style.marginTop = "24px";
}
function addCollisionForce() {
  fgRef.value.d3Force(
    "collision",
    forceCollide((node) => Math.sqrt(100 / (node.level + 1)))
  );
}
function initData() {
  fetch("/d3-dependencies.csv")
    .then((res) => res.text())
    .then(csvParse)
    .then((data: any) => {
      const nodes: any[] = [],
        links: any[] = [];
      data.forEach(({ size, path }) => {
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
}
onMounted(() => {
  addDatGUI();
  addCollisionForce();
  initData();
});
onBeforeUnmount(() => {
  guiCtx.value.destroy();
});
</script>
<template>
  <VueForceGraph2D
    ref="fgRef"
    :graphData="graphData"
    backgroundColor="#090723"
    :dagMode="controls['DAG Orientation']"
    :dagLevelDistance="300"
    :linkColor="() => 'rgba(255,255,255,0.2)'"
    :nodeRelSize="1"
    nodeId="path"
    :nodeVal="(node) => 100 / (node.level + 1)"
    nodeLabel="path"
    nodeAutoColorBy="module"
    :linkDirectionalParticles="2"
    :linkDirectionalParticleWidth="2"
    :d3VelocityDecay="0.3"
  ></VueForceGraph2D>
</template>