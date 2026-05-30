<template>
  <NoteMessage>
    <template #note>
      <b>New node:</b> click on the canvas, <b>New link:</b> drag one node close enough to another
      one, <b>Rename</b> node or link by clicking on it, <b>Remove</b> node or link by
      right-clicking on it
    </template>
    <ForceGraph2D
      style="position: absolute; top: 0; left: 0"
      ref="graph"
      :graph-data="graphData"
      :link-directional-arrow-length="6"
      :link-directional-arrow-rel-pos="1"
      :node-color="nodeColor"
      :link-color="linkColorHandle"
      :link-line-dash="linkLineDash"
      @node-click="nodeClick"
      @node-right-click="noderightClick"
      @link-click="linkClick"
      @link-right-click="linkrightClick"
      @background-click="backgroundClick"
      @node-drag="nodeDrag"
      @node-drag-end="nodeDragEnd"
      :link-visibility="true"
    >
    </ForceGraph2D>
  </NoteMessage>
</template>
<script setup lang="ts">
import type {
  ForceGraph2DExpose,
  ForceGraph2DData,
  ForceGraph2DLinkObject,
  ForceGraph2DNodeObject,
} from "vue-force-graph-2d";
import { ref, shallowRef, watch } from "vue";
import NoteMessage from "@/components/NoteMessage.vue";

let nodeIdCounter = 0,
  linkIdCounter = 0;
let nodes: ForceGraph2DNodeObject[] = [],
  links: ForceGraph2DLinkObject[] = [];
let dragSourceNode: ForceGraph2DNodeObject | null = null,
  interimLink: ForceGraph2DLinkObject | null = null;
const snapInDistance = 20;
const snapOutDistance = 40;
const graphData = shallowRef<ForceGraph2DData>();
const graph = ref<ForceGraph2DExpose>();
const updateGraphData = () => {
  graphData.value = { nodes: nodes, links: links };
};

const distance = (node1: ForceGraph2DNodeObject, node2: ForceGraph2DNodeObject) => {
  return Math.sqrt(Math.pow(node1.x! - node2.x!, 2) + Math.pow(node1.y! - node2.y!, 2));
};

const rename = (nodeOrLink: ForceGraph2DNodeObject | ForceGraph2DLinkObject, type: string) => {
  let value = prompt("Name this " + type + ":", nodeOrLink.name);
  if (!value) {
    return;
  }
  nodeOrLink.name = value;
  updateGraphData();
};

const setInterimLink = (source: ForceGraph2DNodeObject, target: ForceGraph2DNodeObject) => {
  let linkId = linkIdCounter++;
  interimLink = { id: linkId, source: source, target: target, name: "link_" + linkId };
  links.push(interimLink);
  updateGraphData();
};

const removeLink = (link: ForceGraph2DLinkObject) => {
  links.splice(links.indexOf(link), 1);
};

const removeInterimLinkWithoutAddingIt = () => {
  removeLink(interimLink as ForceGraph2DLinkObject);
  interimLink = null;
  updateGraphData();
};

const removeNode = (node: ForceGraph2DNodeObject) => {
  links
    .filter((link) => link.source === node || link.target === node)
    .forEach((link) => removeLink(link));
  nodes.splice(nodes.indexOf(node), 1);
};
function nodeDrag(dragNode: ForceGraph2DNodeObject) {
  dragSourceNode = dragNode;
  for (let node of nodes) {
    if (dragNode === node) {
      continue;
    }
    // close enough: snap onto node as target for suggested link
    if (!interimLink && distance(dragNode, node) < snapInDistance) {
      setInterimLink(dragSourceNode, node);
    }
    // close enough to other node: snap over to other node as target for suggested link
    if (interimLink && node !== interimLink.target && distance(dragNode, node) < snapInDistance) {
      removeLink(interimLink);
      setInterimLink(dragSourceNode, node);
    }
  }
  // far away enough: snap out of the current target node
  if (
    interimLink &&
    distance(dragNode, interimLink.target as ForceGraph2DNodeObject) > snapOutDistance
  ) {
    removeInterimLinkWithoutAddingIt();
  }
}
function nodeDragEnd() {
  dragSourceNode = null;
  interimLink = null;
  updateGraphData();
}
function nodeColor(node: ForceGraph2DNodeObject) {
  return node === dragSourceNode ||
    (interimLink && (node === interimLink.source || node === interimLink.target))
    ? "orange"
    : "";
}
function linkColorHandle(link: ForceGraph2DLinkObject) {
  return link === interimLink ? "orange" : "#bbbbbb";
}
function linkLineDash(link: ForceGraph2DLinkObject) {
  return link === interimLink ? [2, 2] : [];
}
function nodeClick(node: ForceGraph2DNodeObject) {
  return rename(node, "node");
}
function noderightClick(node: ForceGraph2DNodeObject) {
  return removeNode(node);
}
function linkClick(link: ForceGraph2DLinkObject) {
  return rename(link, "link");
}
function linkrightClick(link: ForceGraph2DLinkObject) {
  return removeLink(link);
}
function backgroundClick(event: MouseEvent) {
  let coords = graph.value?.screen2GraphCoords(event.layerX, event.layerY);
  let nodeId = nodeIdCounter++;
  nodes.push({ id: nodeId, x: coords?.x, y: coords?.y, name: "node_" + nodeId });
  updateGraphData();
}

updateGraphData();
</script>
