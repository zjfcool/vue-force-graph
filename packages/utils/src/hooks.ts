import {
  getConfigOptions,
  CompType,
  initEvents,
  CommonMap,
  effectDynamicProps,
  omit,
  createDebouncedResizeObserver,
} from "./utils";

import { watchEffect, onMounted, onBeforeUnmount, Ref } from "vue";
function useForceGraph<F extends (...args: any[]) => any, P extends {}>(
  ForceGraph: F,
  props: P,
  initPropNames: readonly string[] = [],
): CompType {
  const graph = ForceGraph(getConfigOptions(props, initPropNames));
  return graph as CompType;
}
function useForceGraphEvents<E extends string>(
  graph: CompType,
  forceGraphEventMap: { [key: string]: string },
  emit: Function,
) {
  function initEventsCallback(emitName: E, ...args: any[]) {
    emit(emitName, ...args);
  }
  initEvents(graph, forceGraphEventMap, initEventsCallback);
}
function useForceGraphDynamicProps(comp: CompType, props: CommonMap, args: string[] = []) {
  let cacheProps: CommonMap = {};
  const dynamicProps = omit(props, args);
  watchEffect(() => {
    effectDynamicProps(comp, dynamicProps, props, cacheProps);
    cacheProps = { ...props };
  });
}
function useForceGraphResizeObserver(
  comp: CompType,
  props: CommonMap,
  ele: Ref<HTMLElement | null>,
  callback?: (type: string, ...args: any[]) => void,
) {
  let resizeObserver: ReturnType<typeof createDebouncedResizeObserver>;
  function setGraphRect(width: number, height: number) {
    comp.height(height).width(width);
  }
  function resizeHandle(entries: ResizeObserverEntry[]) {
    for (const entry of entries) {
      const { width, height } = entry.contentRect;
      setGraphRect(width, height);
      if (callback instanceof Function) {
        callback("resize", { width: comp.width(), height: comp.height() });
      }
    }
  }
  onMounted(() => {
    if (!props.enableResize) return;
    if (ele.value) {
      const styleWidth = ele.value.style.width;
      const styleHeight = ele.value.style.height;
      ele.value.style.width =
        props.width === undefined ? (styleWidth ? styleWidth : "100%") : props.width + "px";
      ele.value.style.height =
        props.height === undefined ? (styleHeight ? styleHeight : "100%") : props.height + "px";
      let { width, height } = ele.value.getBoundingClientRect();
      setGraphRect(width, height);
      resizeObserver = createDebouncedResizeObserver(resizeHandle);
      resizeObserver.observe(ele.value);
    }
  });
  onBeforeUnmount(() => {
    resizeObserver?.disconnect();
  });
}
function useForceGraphSetup(comp: CompType, ele: Ref<HTMLElement | null>) {
  onMounted(() => {
    if (ele.value) {
      comp(ele.value);
    } else {
      // eslint-disable-next-line no-console
      console.warn("wrapper element is not ready");
    }
  });
  onBeforeUnmount(() => {
    if (comp._destructor instanceof Function) {
      comp._destructor();
    }
  });
}
export {
  useForceGraph,
  useForceGraphEvents,
  useForceGraphDynamicProps,
  useForceGraphResizeObserver,
  useForceGraphSetup,
};
