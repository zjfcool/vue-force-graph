<template>
  <VueForceGraph3D :graphData="graphData">
    <ContextMenu v-slot="data" bindType="canvas">
      <div @click="deleteItem(data)">删除</div>
    </ContextMenu>
    <ContextMenu bindType="node">
      <Menu :data="menuData" @change="menuChange">hello</Menu>
    </ContextMenu>
    <ContextMenu v-slot="data" bindType="edge">
      <div @click="deleteItem(data)">sfsf</div>
    </ContextMenu>
  </VueForceGraph3D>
  <!-- <VueForceGraph2D :graphData="graphData">
    <ContextMenu v-slot="data" bindType="canvas">
      <div @click="deleteItem(data)">删除</div>
    </ContextMenu>
    <ContextMenu v-slot="data" bindType="node">
      <div @click="deleteItem(data)">删aaa除</div>
    </ContextMenu>
    <ContextMenu v-slot="data" bindType="edge">
      <div @click="deleteItem(data)">sfsf</div>
    </ContextMenu>
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
          id: 0,
          label: "hello",
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
    };
    return {
      ...toRefs(state),
      deleteItem,
      menuChange,
    };
  },
});
</script>
