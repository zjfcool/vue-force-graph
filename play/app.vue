<template>
  <VueForceGraph3D :graphData="graphData">
    <GraphContextMenu v-slot="data" bindType="canvas">
      <div style="background: red; color: green" @click="deleteItem(data)">
        删除
      </div>
    </GraphContextMenu>
    <GraphContextMenu bindType="node">
      <GraphMenu :data="menuData" @change="menuChange">hello</GraphMenu>
    </GraphContextMenu>
    <GraphContextMenu bindType="edge">
      <GraphMenu :data="menuData" @change="menuChange">hello</GraphMenu>
    </GraphContextMenu>
  </VueForceGraph3D>
  <!-- <VueForceGraph2D :graphData="graphData">
    <GraphContextMenu v-slot="data" bindType="canvas">
      <ul>
        <li @click="actionHandle(data)">hello</li>
      </ul>
    </GraphContextMenu>
    <GraphContextMenu bindType="node">
      <GraphMenu :data="menuData" @change="menuChange">hello</GraphMenu>
    </GraphContextMenu>
    <GraphContextMenu v-slot="data" bindType="edge">
      <div @click="deleteItem(data)">sfsf</div>
    </GraphContextMenu>
  </VueForceGraph2D> -->

  <!-- <VueForceGraphAR :graphData="graphData"></VueForceGraphAR> -->
  <!-- <VueForceGraphVR :graphData="graphData"></VueForceGraphVR> -->
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
function genRandomTree(N = 300, reverse = false) {
  return {
    nodes: [...Array(N).keys()].map((i) => ({ id: i })),
    links: [...Array(N).keys()]
      .filter((id) => id)
      .map((id) => ({
        [reverse ? "target" : "source"]: id,
        [reverse ? "source" : "target"]: Math.round(Math.random() * (id - 1)),
      })),
  };
}
export default defineComponent({
  components: {
    // VueForceGraph3D,
  },
  setup() {
    const state = reactive({
      graphData: genRandomTree(),
      menuData: [
        {
          id: "delete",
          label: "删除",
        },
        {
          id: 1,
          label: "hhh",
        },
      ],
    });
    const deleteItem = (data) => {
      console.log(data);
    };
    const menuChange = (data) => {
      console.log(data);
      const { activeData, menuItem } = data;
      switch (menuItem.id) {
        case "delete":
          const newNodes = state.graphData.nodes.filter(
            (node) => node.id !== activeData.id
          );
          const newEdges = state.graphData.links.filter(
            (link) =>
              !(
                (link.target as any).id === activeData.id ||
                (link.source as any).id === activeData.id
              )
          );
          console.log(state.graphData);
          state.graphData = {
            nodes: newNodes,
            links: newEdges,
          };
      }
    };
    const actionHandle = (data) => {
      console.log(data);
    };
    return {
      ...toRefs(state),
      deleteItem,
      menuChange,
      actionHandle,
    };
  },
});
</script>
<style>
#app,
body,
html {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
</style>
