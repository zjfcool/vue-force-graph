<template>
  <ForceGraph2D
    :graph-data="graphData"
    :dag-mode="dagMode"
    :dag-level-distance="300"
    node-id="package"
    :link-curvature="linkCurvatureHandle"
    :link-directional-particles="2"
    :link-directional-particle-width="3"
    :node-canvas-object="nodeCanvasObjectHandle"
    :node-pointer-area-paint="nodePointerAreaPaintHandle"
    :link-color="linkColorHandle"
    :d3-alpha-decay="0.02"
    :d3-velocity-decay="0.28"
  ></ForceGraph2D>
</template>
<script setup lang="ts">
import { forceCollide } from "d3-force";
// @ts-ignore
import { GUI } from "https://esm.sh/dat.gui";
import { onBeforeUnmount, onMounted, ref, shallowRef } from "vue";
import type {
  ForceGraph2DExpose,
  ForceGraph2DDagMode,
  ForceGraph2DLinkObject,
  ForceGraph2DNodeObject,
  ForceGraph2DData,
} from "vue-force-graph-2d";
const graph = ref<ForceGraph2DExpose>();
const dagMode = ref<ForceGraph2DDagMode>("lr");
const graphData = shallowRef<ForceGraph2DData>({ nodes: [], links: [] });
const linkColorHandle = () => "rgba(255,255,255,0.2)";

// controls
const controls = { "DAG Orientation": "lr" };
const gui = new GUI();
gui
  .add(controls, "DAG Orientation", ["lr", "td", "radialout", null])
  .onChange((orientation: ForceGraph2DDagMode) => (dagMode.value = orientation));
function linkCurvatureHandle(d: ForceGraph2DLinkObject) {
  if (dagMode.value) {
    const source = d.source as ForceGraph2DNodeObject;
    const target = d.target as ForceGraph2DNodeObject;
    const sourceX = source.x!;
    const targetX = target.x!;
    const sourceY = source.y!;
    const targetY = target.y!;
    return (
      0.07 * // max curvature
      // curve outwards from source, using gradual straightening within a margin of a few px
      (["td", "bu"].includes(dagMode.value)
        ? Math.max(-1, Math.min(1, (sourceX - targetX) / 25))
        : ["lr", "rl"].includes(dagMode.value)
          ? Math.max(-1, Math.min(1, (targetY - sourceY) / 25))
          : ["radialout", "radialin"].includes(dagMode.value)
            ? 0
            : 1)
    );
  }
  return undefined as unknown as number;
}
function nodeCanvasObjectHandle(node: ForceGraph2DNodeObject, ctx: CanvasRenderingContext2D) {
  const label = node.package;
  const fontSize = 15;
  ctx.font = `${fontSize}px Sans-Serif`;
  const textWidth = ctx.measureText(label).width;
  const bckgDimensions = [textWidth, fontSize].map((n) => n + fontSize * 0.2) as number[]; // some padding

  ctx.fillStyle = "#2b5c8873";
  // @ts-expect-error
  ctx.fillRect(node.x! - bckgDimensions[0] / 2, node.y! - bckgDimensions[1] / 2, ...bckgDimensions);

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#ddd";
  ctx.fillText(label, node.x!, node.y!);

  node.__bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint
}
function nodePointerAreaPaintHandle(
  node: ForceGraph2DNodeObject,
  color: string,
  ctx: CanvasRenderingContext2D,
) {
  ctx.fillStyle = color;
  const bckgDimensions = node.__bckgDimensions as { [key: string]: number };
  if (bckgDimensions) {
    ctx.fillRect(
      node.x! - bckgDimensions[0] / 2,
      node.y! - bckgDimensions[1] / 2,
      // @ts-expect-error
      ...bckgDimensions,
    );
  }
}
fetch("//cdn.jsdelivr.net/npm/d3@5.9.7/yarn.lock")
  .then((r) => r.text())
  .then((text) => {
    // @ts-expect-error
    const yarnlock = window._yarnpkg_lockfile.parse(text);
    if (yarnlock.type !== "success") throw new Error("invalid yarn.lock");
    return yarnlock.object;
  })
  .then((yarnlock) => {
    const nodes: ForceGraph2DNodeObject[] = [];
    const links: ForceGraph2DLinkObject[] = [];

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
