<template>
  <div
    ref="menuContainerRef"
    class="menus-container"
    v-show="visible"
    :style="{
      width: width,
      height: height,
      backgroundColor: backgroundColor,
    }"
    @click.stop
  >
    <slot :graphContext="graphContext" :data="activeData" :event="event" />
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  toRefs,
  watch,
  watchEffect,
} from "vue";
import {
  useInjector,
  useGraphContext,
  useProvider,
  useMenuData,
} from "@vue-force-graph/utils/hooks";
//@ts-ignore
import { contextMenuProps } from "./context-menu.ts";

export default defineComponent({
  name: "ContextMenu",
  props: contextMenuProps,
  setup(props) {
    const menuContainerRef = ref();
    const state = reactive({
      visible: false,
      xyz: [0, 0, 0],
    });
    const menuData = reactive({
      graphContext: null,
      activeData: null,
      event: null,
    });
    const graphContext = useInjector(useGraphContext.token) as any;
    menuData.graphContext = graphContext;
    console.dir(graphContext);
    const show = () => {
      state.visible = true;
    };
    const hide = () => {
      state.visible = false;
    };
    let reqID;
    console.log("helleo");
    const resetContainerPosition = () => {
      let x = 0,
        y = 0;
      if (props.mode === "3d" || props.mode === "2d") {
        if (state.xyz.every((v) => !v)) return;
        const g = graphContext.graph2ScreenCoords(...state.xyz);
        x = g.x;
        y = g.y;
      }
      console.log("heleleeee");
      if (state.visible) {
        setContainerPosition(x, y);
      } else {
        return;
      }
      reqID = window.requestAnimationFrame(resetContainerPosition);
    };
    watch(
      () => state.visible,
      () => {
        if (!state.visible) {
          window.cancelAnimationFrame(reqID);
        } else {
          reqID = window.requestAnimationFrame(resetContainerPosition);
        }
      }
    );
    watchEffect(() => {
      useProvider(useMenuData, menuData);
    });
    const setContainerPosition = (x, y) => {
      menuContainerRef.value.style.top = y + "px";
      menuContainerRef.value.style.left = x + "px";
    };
    const onActionHandle = () => {
      switch (props.bindType) {
        case "node":
          onNodeRightClickHandle();
          break;
        case "edge":
          onLinkRightClickHandle();
          break;
        case "canvas":
          onBackgroundRightClickHandle();
          break;
      }
    };
    const onNodeRightClickHandle = () => {
      graphContext.onNodeRightClick((node, evt) => {
        console.log(node, evt);
        menuData.activeData = node;
        menuData.event = evt;
        state.xyz = [node.x, node.y, node.z];
        const x = evt.clientX;
        const y = evt.clientY;
        setContainerPosition(x, y);
        show();
      });
    };
    const onLinkRightClickHandle = () => {
      graphContext.onLinkRightClick((node, evt) => {
        console.log("onLinkRightClick", node, evt);
      });
    };

    const onBackgroundRightClickHandle = () => {
      graphContext.onBackgroundRightClick((evt) => {
        menuData.event = evt;
        menuData.activeData = null;
        setContainerPosition(evt.clientX, evt.clientY);
        show();
      });
    };
    onActionHandle();
    onMounted(() => {
      document.addEventListener("click", hide, false);
      resetContainerPosition();
    });
    onBeforeUnmount(() => {
      document.removeEventListener("click", hide, false);
    });
    return {
      menuContainerRef,
      ...toRefs(state),
      ...toRefs(menuData),
    };
  },
});
</script>
<style scoped>
.menus-container {
  position: fixed;
  width: 100px;
}
</style>
