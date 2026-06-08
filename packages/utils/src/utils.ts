import type { App, Plugin } from "vue";
/**
 * 创建一个带防抖功能的 ResizeObserver
 * @param callback - 尺寸变化时的回调函数（注意：防抖后只会传入最后一次触发的 entries）
 * @param delay   - 防抖延迟时间（毫秒），默认 200ms
 * @param options - ResizeObserver 的选项（如 box: 'border-box'）
 * @returns 包含 observe / unobserve / disconnect 方法的对象
 */
function createDebouncedResizeObserver(
  callback: (entries: ResizeObserverEntry[], observer: ResizeObserver) => void,
  delay: number = 200,
) {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let lastEntries: ResizeObserverEntry[] = [];
  let lastObserver: ResizeObserver | null = null;

  const debouncedHandler = (entries: ResizeObserverEntry[], observer: ResizeObserver) => {
    // 每次新变化都重置计时器
    if (timer) clearTimeout(timer);
    lastEntries = entries;
    lastObserver = observer;
    timer = setTimeout(() => {
      if (lastObserver) {
        callback(lastEntries, lastObserver);
        lastEntries = [];
        lastObserver = null;
      }
      timer = null;
    }, delay);
  };

  const observer = new ResizeObserver(debouncedHandler);
  return {
    /** 开始观察元素 */
    observe: (target: Element, options?: ResizeObserverOptions) =>
      observer.observe(target, options),
    /** 停止观察元素 */
    unobserve: (target: Element) => observer.unobserve(target),
    /** 断开所有观察 */
    disconnect: () => {
      if (timer) clearTimeout(timer);
      observer.disconnect();
    },
  };
}
type CommonMap = {
  [key: string]: any;
};
function omit<T extends {}>(props: T, args: readonly string[]) {
  return Object.fromEntries(
    Object.keys(props)
      .filter((k) => {
        return !args.includes(k);
      })
      .map((k) => [k, props[k as keyof T]]),
  );
}
type CompType<T extends {} = CommonMap> = ((domEl: HTMLElement) => T) & T;
function getExposeMap<T extends CompType = CompType>(comp: T, methodNames: readonly string[]) {
  return Object.fromEntries(methodNames.map((k) => [k, comp[k]]));
}
function getConfigOptions<T extends {}>(props: T, initPropNames: readonly string[] = []) {
  return Object.fromEntries(
    initPropNames
      .filter((key) => props.hasOwnProperty(key))
      .map((key) => [key, props[key as keyof T]]),
  );
}
function __call<T extends CompType = CompType>(comp: T, method: string, ...args: any[]) {
  if (comp[method] instanceof Function) {
    comp[method](...args);
  }
}
function initEvents<B extends string, T extends CompType = CompType>(
  comp: T,
  forceGraphEventMap: { [key: string]: string },
  callback: (emitName: B, ...args: any[]) => void,
) {
  Object.entries(forceGraphEventMap).forEach(([methodName, emitName]) => {
    __call(comp, methodName, (...args: any[]) => {
      callback(emitName as B, ...args);
    });
  });
}
function effectDynamicProps<
  P extends D,
  T extends CompType = CompType,
  D extends CommonMap = CompType,
>(comp: T, dynamicProps: D, props: P, cacheProps: P) {
  Object.keys(dynamicProps)
    .filter((p) => {
      return cacheProps[p] !== props[p];
    })
    .forEach((p: any) => {
      if (comp[p] instanceof Function) {
        comp[p](props[p]);
      }
    });
}

export type SFCWithInstall<T> = T & Plugin;

export const withInstall = <T, E extends Record<string, any>>(main: T, extra?: E) => {
  (main as SFCWithInstall<T>).install = function (app: App) {
    for (const comp of [main, ...Object.values(extra ?? {})]) {
      app.component((comp as any).name, comp);
    }
  };
  if (extra) {
    for (const [key, comp] of Object.entries(extra)) {
      (main as any)[key] = comp;
    }
  }
  return main as SFCWithInstall<T> & E;
};
export {
  createDebouncedResizeObserver,
  omit,
  type CompType,
  getExposeMap,
  getConfigOptions,
  initEvents,
  effectDynamicProps,
  type CommonMap,
};
