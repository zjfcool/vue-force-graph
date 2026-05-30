<template>
  <ForceGraph2D
    ref="graph"
    @engine-stop="enginStopHandle"
    :graph-data="graphData"
    node-id="id"
    node-label="id"
    :cooldown-ticks="0"
    :link-directional-arrow-length="3"
    :link-directional-arrow-rel-pos="1"
    :link-curvature="linkCurvatureHandle"
    :link-color="linkColorHandle"
  >
  </ForceGraph2D>
</template>
<script setup lang="ts">
// @ts-ignore
import dagre from "https://esm.sh/dagre";
// @ts-ignore
import accessorFn from "https://esm.sh/accessor-fn";
import type {
  ForceGraph2DExpose,
  ForceGraph2DData,
  ForceGraph2DLinkObject,
  ForceGraph2DNodeObject,
} from "vue-force-graph-2d";
import { ref, shallowRef } from "vue";
const nodeRelSize = 4;
const graphData = shallowRef<ForceGraph2DData>();
const graph = ref<ForceGraph2DExpose>();
const linkColorHandle = () => "rgba(255,255,255,0.2)";
let isZoomToFit = false;
fetch("/vue-force-graph-2d/yarn.lock")
  .then((r) => r.text())
  .then((text) => {
    // @ts-ignore
    const yarnlock = _yarnpkg_lockfile.parse(text);
    if (yarnlock.type !== "success") throw new Error("invalid yarn.lock");
    return yarnlock.object;
  })
  .then((yarnlock) => {
    const nodes: ForceGraph2DNodeObject[] = [];
    const links: ForceGraph2DLinkObject[] = [];
    Object.entries(yarnlock).forEach(([pkg, details]: [string, any]) => {
      nodes.push({ id: pkg });
      if (details.dependencies) {
        Object.entries(details.dependencies).forEach(([dep, version]) => {
          links.push({ source: pkg, target: `${dep}@${version}` });
        });
      }
    });
    return { nodes, links };
  })
  .then((data) => {
    const nodeDiameter = nodeRelSize * 2;
    const layoutData = getLayout(data.nodes, data.links, {
      nodeWidth: nodeDiameter,
      nodeHeight: nodeDiameter,
      nodesep: nodeDiameter * 0.5,
      ranksep: nodeDiameter * Math.sqrt(data.nodes.length) * 0.6,

      // root nodes aligned on top
      rankDir: "BT",
      ranker: "longest-path",
      linkSource: "target",
      linkTarget: "source",
    });
    layoutData.nodes.forEach((node: ForceGraph2DNodeObject) => {
      node.fx = node.x;
      node.fy = node.y;
    }); // fix nodes
    graphData.value = layoutData;
    isZoomToFit = true;
  });

function enginStopHandle() {
  if (isZoomToFit) {
    graph.value?.zoomToFit(2000);
    isZoomToFit = false;
  }
}

function linkCurvatureHandle(d: ForceGraph2DLinkObject) {
  const sourceX = (d.source as ForceGraph2DNodeObject).x!;
  const sourceY = (d.source as ForceGraph2DNodeObject).y!;
  const targetX = (d.target as ForceGraph2DNodeObject).x!;
  const targetY = (d.target as ForceGraph2DNodeObject).y!;
  return (
    0.07 * // max curvature
    //   curve outwards from source, using gradual straightening within a margin of a few px
    Math.max(-1, Math.min(1, (sourceX - targetX) / 5)) *
    Math.max(-1, Math.min(1, (targetY - sourceY) / 5))
  );
}

function getLayout(
  nodes: ForceGraph2DNodeObject[],
  links: ForceGraph2DLinkObject[],
  {
    nodeId = "id",
    linkSource = "source",
    linkTarget = "target",
    nodeWidth = 0,
    nodeHeight = 0,
    ...graphCfg
  } = {} as { [key: string]: any },
) {
  const getNodeWidth = accessorFn(nodeWidth);
  const getNodeHeight = accessorFn(nodeHeight);

  const g = new dagre.graphlib.Graph();
  g.setGraph({
    // rankDir: 'LR',
    // ranker: 'network-simplex' // 'tight-tree', 'longest-path'
    // acyclicer: 'greedy'
    nodesep: 5,
    edgesep: 1,
    ranksep: 20,
    ...graphCfg,
  });

  nodes.forEach((node) =>
    g.setNode(
      node[nodeId],
      Object.assign({}, node, {
        width: getNodeWidth(node),
        height: getNodeHeight(node),
      }),
    ),
  );
  links.forEach((link) => g.setEdge(link[linkSource], link[linkTarget], Object.assign({}, link)));

  dagre.layout(g);

  return {
    nodes: g.nodes().map((n: any) => {
      const node = g.node(n);
      delete node.width;
      delete node.height;
      return node;
    }),
    links: g.edges().map((e: any) => g.edge(e)),
  };
}
</script>
