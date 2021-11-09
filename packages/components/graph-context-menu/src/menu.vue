<template>
  <ul class="force-graph-menu">
    <slot v-if="!data.length" />
    <li
      class="force-graph-menu-item"
      v-for="item in data"
      :key="item.id"
      @click="clickItemHandle(item)"
    >
      {{ item.label }}
    </li>
  </ul>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useInjector, useMenuData } from "@vue-force-graph/utils/hooks";
// @ts-ignore
import { menuProps } from "./menu.ts";

export default defineComponent({
  name: "GraphMenu",
  props: menuProps,
  emits: ["change"],
  setup(_, { emit }) {
    const data = useInjector(useMenuData.token) as any;
    const clickItemHandle = (item) => {
      const { activeData, event, graphContext } = data;
      emit("change", {
        activeData,
        event,
        graphContext,
        menuItem: item,
      });
    };
    return {
      clickItemHandle,
    };
  },
});
</script>
<style scoped>
ul,
li {
  margin: 0;
  padding: 0;
}
.force-graph-menu {
  color: #000;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}
.force-graph-menu-item {
  padding: 4px 12px;
  background-color: #fff;
  list-style: none;
}

.force-graph-menu-item:hover {
  cursor: pointer;
  background-color: #ddd;
}
</style>
