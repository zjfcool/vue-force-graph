<script lang="ts">
import { ref, defineComponent } from "vue";
import { genRandomTree } from "../utils";
export default defineComponent({
  setup() {
    const graphData = genRandomTree(600, true) as any;
    const rootId = 0;
    const getNodesById = () => {
      const nodesById = Object.fromEntries(
        graphData.nodes.map((node) => [node.id, node])
      );

      // link parent/children
      graphData.nodes.forEach((node) => {
        node.collapsed = node.id !== rootId;
        node.childLinks = [];
      });
      graphData.links.forEach((link) =>
        nodesById[link.source].childLinks.push(link)
      );

      return nodesById;
    };
    const nodesById = getNodesById();
    const getPrunedTree = () => {
      const visibleNodes: any[] = [];
      const visibleLinks: any[] = [];

      (function traverseTree(node = nodesById[rootId]) {
        visibleNodes.push(node);
        if (node.collapsed) return;
        visibleLinks.push(...node.childLinks);
        node.childLinks
          .map((link) =>
            typeof link.target === "object"
              ? link.target
              : nodesById[link.target]
          ) // get child node
          .forEach(traverseTree);
      })();

      return { nodes: visibleNodes, links: visibleLinks };
    };
    const prunedTree = ref(getPrunedTree());
    const handleNodeClick = (node) => {
      node.collapsed = !node.collapsed; // toggle collapse state
      prunedTree.value = getPrunedTree();
    };
    const getNodeColor = (node) =>
      !node.childLinks.length ? "green" : node.collapsed ? "red" : "yellow";
    return {
      prunedTree,
      handleNodeClick,
      getNodeColor,
    };
  },
});
</script>
<template>
  <VueForceGraph3D
    :graphData="prunedTree"
    backgroundColor="#090723"
    :onNodeClick="handleNodeClick"
    :linkDirectionalParticles="2"
    :nodeColor="getNodeColor"
  ></VueForceGraph3D>
</template>