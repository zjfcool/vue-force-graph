<template>
  <div ref="domEl"></div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import {
  ForceGraphProps,
  ForceGraphEmits,
  ForceGraphExpose,
  forceGraphEventMap,
  methodNames,
} from "./forceGraph2D";
import ForceGraph2D from "force-graph";
import {
  useForceGraph,
  useForceGraphDynamicProps,
  useForceGraphEvents,
  useForceGraphResizeObserver,
  useForceGraphSetup,
} from "utils";
defineOptions({
  name: "ForceGraph2D",
});
const props = withDefaults(defineProps<ForceGraphProps>(), {
  linkVisibility: true,
  nodVisibility: true,
  enableNodeDrag: true,
  enableZoomInteraction: true,
  showPointerCursor: true,
  enablePointerInteraction: true,
  enablePanInteraction: true,
  enableResize: true,
});
const emit = defineEmits<ForceGraphEmits>();
const domEl = ref<HTMLDivElement | null>(null);
const comp = useForceGraph(ForceGraph2D as any, props);
useForceGraphEvents(comp, forceGraphEventMap, emit);
useForceGraphDynamicProps(comp, props, [...methodNames]);
useForceGraphResizeObserver(comp, props, domEl, (type: string, ...args: any[]) => {
  // @ts-ignore
  emit(type, ...args);
});
useForceGraphSetup(comp, domEl);
comp.wrapperElement = domEl;
// proxy comp
defineExpose<ForceGraphExpose>(
  new Proxy(comp as unknown as ForceGraphExpose, {
    get(target, key, receiver) {
      return Reflect.get(target, key, receiver);
    },
  }),
);
</script>
