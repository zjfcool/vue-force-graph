import {
  getConfigOptions,
  CompType,
  initEvents,
  CommonMap,
  effectDynamicProps,
  omit,
  createDebouncedResizeObserver,
} from "./utils";

import { watchEffect, onMounted, onBeforeUnmount, Ref, nextTick } from "vue";
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
      if (ele.value) {
        if (entry.target !== ele.value) {
          ele.value.style.width = width + "px";
          ele.value.style.height = height + "px";
        }
      }
      setGraphRect(width, height);
      if (callback instanceof Function) {
        callback("resize", { width: comp.width(), height: comp.height() });
      }
    }
  }
  function setObserveElementStyle(ele: HTMLElement) {
    const styleWidth = ele.style.width;
    const styleHeight = ele.style.height;

    ele.style.width =
      props.width === undefined ? (styleWidth ? styleWidth : "100%") : props.width + "px";
    ele.style.height =
      props.height === undefined ? (styleHeight ? styleHeight : "100%") : props.height + "px";
  }
  onMounted(async () => {
    if (!props.enableResize) return;
    await nextTick();
    if (ele.value) {
      const resizeObserveElement = props.resizeObserveElement ?? ele.value;
      if (!(resizeObserveElement instanceof HTMLElement)) {
        // eslint-disable-next-line no-console
        console.warn("prop resizeObserveElement must be a  HTMLElement");
        return;
      }
      const resizeDebounceTime = props.resizeDebounceTime ?? 200;
      setObserveElementStyle(resizeObserveElement);
      resizeObserver = createDebouncedResizeObserver(resizeHandle, resizeDebounceTime);
      resizeObserver.observe(resizeObserveElement);
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
