import ForceGraph from "force-graph";
import { Ref } from "vue";

export interface GraphData<NodeType = {}, LinkType = {}> {
  nodes: NodeObject<NodeType>[];
  links: LinkObject<NodeType, LinkType>[];
}

export type NodeObject<NodeType = {}> = NodeType & {
  id?: string | number;
  pos?: number;
  index?: number;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number;
  fy?: number;
  [others: string]: any;
};

export type LinkObject<NodeType = {}, LinkType = {}> = LinkType & {
  source?: string | number | NodeObject<NodeType>;
  target?: string | number | NodeObject<NodeType>;
  [others: string]: any;
};

type Accessor<In, Out> = Out | string | ((obj: In) => Out);
type NodeAccessor<NodeType, T> = Accessor<NodeObject<NodeType>, T>;
type LinkAccessor<NodeType, LinkType, T> = Accessor<LinkObject<NodeType, LinkType>, T>;

type TooltipContent = string;

type CanvasCustomRenderMode = "replace" | "before" | "after";
type CanvasCustomRenderFn<T> = (
  obj: T,
  canvasContext: CanvasRenderingContext2D,
  globalScale: number,
) => void;
type CanvasPointerAreaPaintFn<T> = (
  obj: T,
  paintColor: string,
  canvasContext: CanvasRenderingContext2D,
  globalScale: number,
) => void;

export type DagMode = "td" | "bu" | "lr" | "rl" | "radialout" | "radialin";

// interface ForceFn<NodeType = {}> {
//   (alpha: number): void;
//   initialize?: (nodes: NodeObject<NodeType>[], ...args: any[]) => void;
//   [key: string]: any;
// }

export interface ForceGraphProps<NodeType = {}, LinkType = {}> {
  // Data input
  graphData?: GraphData<NodeObject<NodeType>, LinkObject<NodeType, LinkType>>;
  nodeId?: string;
  linkSource?: string;
  linkTarget?: string;

  // Container layout
  width?: number;
  height?: number;
  backgroundColor?: string;

  // Node styling
  nodeRelSize?: number;
  nodeVal?: NodeAccessor<NodeType, number>;
  nodeLabel?: NodeAccessor<NodeType, TooltipContent>;
  nodeVisibility?: NodeAccessor<NodeType, boolean>;
  nodeColor?: NodeAccessor<NodeType, string>;
  nodeAutoColorBy?: NodeAccessor<NodeType, string | null>;
  nodeCanvasObjectMode?: string | ((obj: NodeObject<NodeType>) => CanvasCustomRenderMode | any);
  nodeCanvasObject?: CanvasCustomRenderFn<NodeObject<NodeType>>;
  nodePointerAreaPaint?: CanvasPointerAreaPaintFn<NodeObject<NodeType>>;

  // Link styling
  linkLabel?: LinkAccessor<NodeType, LinkType, TooltipContent>;
  linkVisibility?: LinkAccessor<NodeType, LinkType, boolean>;
  linkColor?: LinkAccessor<NodeType, LinkType, string>;
  linkAutoColorBy?: LinkAccessor<NodeType, LinkType, string | number | null>;
  linkLineDash?: LinkAccessor<NodeType, LinkType, number[] | null>;
  linkWidth?: LinkAccessor<NodeType, LinkType, number>;
  linkCurvature?: LinkAccessor<NodeType, LinkType, number>;
  linkCanvasObject?: CanvasCustomRenderFn<LinkObject<NodeType, LinkType>>;
  linkCanvasObjectMode?:
    | string
    | ((obj: LinkObject<NodeType, LinkType>) => CanvasCustomRenderMode | any);
  linkDirectionalArrowLength?: LinkAccessor<NodeType, LinkType, number>;
  linkDirectionalArrowColor?: LinkAccessor<NodeType, LinkType, string>;
  linkDirectionalArrowRelPos?: LinkAccessor<NodeType, LinkType, number>;
  linkDirectionalParticles?: LinkAccessor<NodeType, LinkType, number>;
  linkDirectionalParticleSpeed?: LinkAccessor<NodeType, LinkType, number>;
  linkDirectionalParticleOffset?: LinkAccessor<NodeType, LinkType, number>;
  linkDirectionalParticleWidth?: LinkAccessor<NodeType, LinkType, number>;
  linkDirectionalParticleColor?: LinkAccessor<NodeType, LinkType, string>;
  linkDirectionalParticleCanvasObject?: (
    x: number,
    y: number,
    link: LinkType,
    canvasContext: CanvasRenderingContext2D,
    globalScale: number,
  ) => void;
  linkPointerAreaPaint?: CanvasPointerAreaPaintFn<LinkObject<NodeType, LinkType>>;

  // Render control
  autoPauseRedraw?: boolean;
  minZoom?: number;
  maxZoom?: number;

  // Force engine (d3-force) configuration
  dagMode?: DagMode;
  dagLevelDistance?: number | null;
  dagNodeFilter?: (node: NodeObject<NodeType>) => boolean;

  d3AlphaMin?: number;
  d3AlphaDecay?: number;
  d3VelocityDecay?: number;
  ngraphPhysics?: object;
  warmupTicks?: number;
  cooldownTicks?: number;
  cooldownTime?: number;

  // Interaction

  linkHoverPrecision?: number;
  showPointerCursor?:
    | boolean
    | ((obj: NodeObject<NodeType> | LinkObject<NodeType, LinkType> | undefined) => boolean);

  enableNodeDrag?: boolean;
  enableZoomInteraction?: boolean | ((event: MouseEvent) => boolean);
  enablePanInteraction?: boolean | ((event: MouseEvent) => boolean);
  enablePointerInteraction?: boolean;
  enableResize?: boolean;
}

export interface ForceGraphExpose extends ForceGraph {
  wrapperElement: Ref<HTMLElement | null>;
}

export interface ForceGraphEmits<NodeType = {}, LinkType = {}> {
  "dag-error": [loopNodeIds: (string | number)[]];
  "render-frame-pre": [canvasContext: CanvasRenderingContext2D, globalScale: number];
  "render-frame-post": [canvasContext: CanvasRenderingContext2D, globalScale: number];
  "engine-tick": [];
  "engine-stop": [];
  // Interaction
  "node-click": [node: NodeObject<NodeType>, event: MouseEvent];
  "node-right-click": [node: NodeObject<NodeType>, event: MouseEvent];
  "node-hover": [node: NodeObject<NodeType> | null, previousNode: NodeObject<NodeType> | null];
  "node-drag": [node: NodeObject<NodeType>, translate: { x: number; y: number }];
  "node-drag-end": [node: NodeObject<NodeType>, translate: { x: number; y: number }];
  "link-click": [link: LinkObject<NodeType, LinkType>, event: MouseEvent];
  "link-right-click": [link: LinkObject<NodeType, LinkType>, event: MouseEvent];
  "link-hover": [link: LinkObject<NodeType, LinkType>];
  "background-click": [event: MouseEvent];
  "background-right-click": [event: MouseEvent];
  zoom: [transform: { k: number; x: number; y: number }];
  "zoom-end": [transform: { k: number; x: number; y: number }];
  resize: [rect: { width: number; height: number }];
}
export const forceGraphEventMap = {
  onDagError: "dag-error",
  onRenderFramePre: "render-frame-pre",
  onRenderFramePost: "render-frame-post",
  onEngineTick: "engine-tick",
  onEngineStop: "engine-stop",
  onNodeClick: "node-click",
  onNodeRightClick: "node-right-click",
  onNodeHover: "node-hover",
  onNodeDrag: "node-drag",
  onNodeDragEnd: "node-drag-end",
  onLinkClick: "link-click",
  onLinkRightClick: "link-right-click",
  onLinkHover: "link-hover",
  onBackgroundClick: "background-click",
  onBackgroundRightClick: "background-right-click",
  onZoom: "zoom",
  onZoomEnd: "zoom-end",
  onResize: "resize",
} as const;
// export type ForceGraphEventName = (typeof forceGraphEventMap)[keyof typeof forceGraphEventMap];

export const methodNames: (keyof ForceGraphExpose)[] = [
  // bind methods
  "emitParticle",
  "d3Force",
  "d3ReheatSimulation",
  "pauseAnimation",
  "resumeAnimation",
  "centerAt",
  "zoom",
  "zoomToFit",
  "getGraphBbox",
  "screen2GraphCoords",
  "graph2ScreenCoords",
];
