<template>
  <ForceGraph3D
    background-color="#101020"
    :graph-data="graphData"
    :dag-mode="dagMode"
    :link-color="linkColorHandle"
    :dag-level-distance="180"
    node-id="package"
    :link-curvature="0.07"
    :nodeThreeObject="nodeThreeObjectHandle"
    :d3-alpha-decay="0.02"
    :d3-velocity-decay="0.3"
    @dag-error="dagErrorHandle"
  ></ForceGraph3D>
</template>
<script setup lang="ts">
// @ts-ignore
import SpriteText from "https://esm.sh/three-spritetext";
// @ts-ignore
import { forceCollide } from "https://esm.sh/d3-force-3d";
// @ts-ignore
import { GUI } from "https://esm.sh/dat.gui";
import { onBeforeUnmount, onMounted, ref, shallowRef } from "vue";
import type {
  ForceGraph3DDagMode,
  ForceGraph3DData,
  ForceGraph3DExpose,
  ForceGraph3DLinkObject,
  ForceGraph3DNodeObject,
} from "vue-force-graph-3d";
const dagMode = ref<ForceGraph3DDagMode>("lr");

// controls
const controls = { "DAG Orientation": "lr" };
const gui = new GUI();
gui
  .add(controls, "DAG Orientation", ["lr", "td", "zout", "radialout", null])
  .onChange((orientation: ForceGraph3DDagMode) => (dagMode.value = orientation));
const linkColorHandle = () => "rgba(255, 255, 255, 0.6)";
const dagErrorHandle = () => false;
const nodeThreeObjectHandle = (node: ForceGraph3DNodeObject) => {
  const sprite = new SpriteText(node.package);
  sprite.material.depthWrite = false;
  sprite.color = "lightsteelblue";
  sprite.textHeight = 8;
  return sprite;
};

// graph config
const graph = ref<ForceGraph3DExpose>();
const graphData = shallowRef<ForceGraph3DData>();
fetch("/vue-force-graph-3d/yarn.lock")
  .then((r) => r.text())
  .then((text) => {
    // @ts-ignore
    const yarnlock = window._yarnpkg_lockfile.parse(text);
    if (yarnlock.type !== "success") throw new Error("invalid yarn.lock");
    return yarnlock.object;
  })
  .then((yarnlock) => {
    const nodes: ForceGraph3DNodeObject[] = [];
    const links: ForceGraph3DLinkObject[] = [];

    Object.entries(yarnlock).forEach(([pkg, details]: [string, any]) => {
      nodes.push({
        package: pkg,
        version: details.version,
      });

      if (details.dependencies) {
        Object.entries(details.dependencies).forEach(([dep, version]) => {
          links.push({ source: pkg, target: `${dep}@${version}` });
        });
      }
    });

    graphData.value = { nodes, links };
  });

onMounted(() => {
  graph.value?.d3Force("collide", forceCollide(13));
});
onBeforeUnmount(() => {
  gui.destroy();
});
</script>
