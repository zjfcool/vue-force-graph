<script setup lang="ts">
import { ref } from "vue";
import { genRandomTree } from "../utils";
import { GraphContextMenu, GraphMenu } from "vue-force-graph";
const graphData = ref(genRandomTree());
const is2D = ref(false);
const nodeMenuData = ref([
  {
    id: "delete",
    label: "删除",
  },
  {
    id: "preview",
    label: "查看",
  },
]);
const edgeMenuData = ref([
  {
    id: "cancel",
    label: "取消关联",
  },
]);
function nodeMenuChange(data) {
  const { menuItem } = data;
  console.log(data);
  alert(`action ${menuItem.label}`);
}
function createNodeByCanvas(data) {
  console.log(data);
  alert(`action 创建`);
}
function edgeMenuChange(data) {
  const { menuItem } = data;
  console.log(data);
  alert(`action ${menuItem.label}`);
}
function toggle() {
  is2D.value = !is2D.value;
}
</script>
<template>
  <div @click="toggle" class="toggle-btn">{{ is2D ? "3D" : "2D" }}</div>
  <VueForceGraph3D
    v-if="!is2D"
    :graphData="graphData"
    backgroundColor="#090723"
  >
    <GraphContextMenu bindType="node">
      <GraphMenu :data="nodeMenuData" @change="nodeMenuChange"></GraphMenu>
    </GraphContextMenu>
    <GraphContextMenu v-slot="data" bindType="canvas">
      <ul class="custom-menu-container">
        <li @click="createNodeByCanvas(data)">创建</li>
      </ul>
    </GraphContextMenu>
    <GraphContextMenu bindType="edge">
      <GraphMenu :data="edgeMenuData" @change="edgeMenuChange"></GraphMenu>
    </GraphContextMenu>
  </VueForceGraph3D>
  <VueForceGraph2D
    v-if="is2D"
    :graphData="graphData"
    backgroundColor="#090723"
    :linkColor="() => 'rgba(255,255,255,.2)'"
  >
    <GraphContextMenu bindType="node">
      <GraphMenu :data="nodeMenuData" @change="nodeMenuChange"></GraphMenu>
    </GraphContextMenu>
    <GraphContextMenu v-slot="data" bindType="canvas">
      <ul class="custom-menu-container">
        <li @click="createNodeByCanvas(data)">创建</li>
      </ul>
    </GraphContextMenu>
    <GraphContextMenu bindType="edge">
      <GraphMenu :data="edgeMenuData" @change="edgeMenuChange"></GraphMenu>
    </GraphContextMenu>
  </VueForceGraph2D>
</template>
<style>
.custom-menu-container {
  border-radius: 5px;
  box-shadow: 1px 1px 5px rgba(255, 255, 255, 0.2),
    -1px -1px 5px rgba(255, 255, 255, 0.2);
  color: #fff;
  cursor: pointer;
}
.custom-menu-container li {
  padding: 8px 14px;
}
@keyframes slide-fade-in {
  from {
    transform: translateX(36px);
    opacity: 0;
  }
  to {
    transform: translateX(0px);
    opacity: 1;
  }
}
.toggle-btn {
  position: absolute;
  right: 32px;
  bottom: 32px;
  z-index: 9;
  width: 36px;
  height: 36px;
  background-color: #090723;
  color: #fff;
  border-radius: 50%;
  padding: 4px;
  box-shadow: 1px 1px 5px rgba(255, 255, 255, 0.5),
    -1px -1px 5px rgba(255, 255, 255, 0.5);
  text-align: center;
  line-height: 36px;
  cursor: pointer;
  animation: slide-fade-in 1s ease-in;
  transition: all 0.25s linear;
}
</style>