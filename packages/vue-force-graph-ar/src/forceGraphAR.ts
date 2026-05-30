import { Object3D, Material } from "three";
import { ConfigOptions, ForceGraphARInstance } from "3d-force-graph-ar";
import { Ref } from "vue";

export interface GraphData<NodeType = {}, LinkType = {}> {
  nodes: NodeObject<NodeType>[];
  links: LinkObject<NodeType, LinkType>[];
}

export type NodeObject<NodeType = {}> = NodeType & {
  id?: string | number;
  x?: number;
  y?: number;
  z?: number;
  vx?: number;
  vy?: number;
  vz?: number;
  fx?: number;
  fy?: number;
  fz?: number;
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

export type DagMode = "td" | "bu" | "lr" | "rl" | "zout" | "zin" | "radialout" | "radialin";

type ForceEngine = "d3" | "ngraph";

type Coords = { x: number; y: number; z: number };

type LinkPositionUpdateFn = <NodeType = {}, LinkType = {}>(
  obj: Object3D,
  coords: { start: Coords; end: Coords },
  link: LinkObject<NodeType, LinkType>,
) => void | null | boolean;

export interface ForceGraphProps<NodeType = {}, LinkType = {}> extends ConfigOptions {
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
  nodeVisibility?: NodeAccessor<NodeType, boolean>;
  nodeColor?: NodeAccessor<NodeType, string>;
  nodeAutoColorBy?: NodeAccessor<NodeType, string | null>;
  nodeOpacity?: number;
  nodeResolution?: number;
  nodeThreeObject?: NodeAccessor<NodeType, Object3D>;
  nodeThreeObjectExtend?: NodeAccessor<NodeType, boolean>;

  // Link styling
  linkVisibility?: LinkAccessor<NodeType, LinkType, boolean>;
  linkColor?: LinkAccessor<NodeType, LinkType, string>;
  linkAutoColorBy?: LinkAccessor<NodeType, LinkType, string | null>;
  linkWidth?: LinkAccessor<NodeType, LinkType, number>;
  linkOpacity?: number;
  linkResolution?: number;
  linkCurvature?: LinkAccessor<NodeType, LinkType, number>;
  linkCurveRotation?: LinkAccessor<NodeType, LinkType, number>;
  linkMaterial?: LinkAccessor<NodeType, LinkType, Material | boolean | null>;
  linkThreeObject?: LinkAccessor<NodeType, LinkType, Object3D>;
  linkThreeObjectExtend?: LinkAccessor<NodeType, LinkType, boolean>;
  linkPositionUpdate?: LinkPositionUpdateFn | null;
  linkDirectionalArrowLength?: LinkAccessor<NodeType, LinkType, number>;
  linkDirectionalArrowColor?: LinkAccessor<NodeType, LinkType, string>;
  linkDirectionalArrowRelPos?: LinkAccessor<NodeType, LinkType, number>;
  linkDirectionalArrowResolution?: number;
  linkDirectionalParticles?: LinkAccessor<NodeType, LinkType, number>;
  linkDirectionalParticleSpeed?: LinkAccessor<NodeType, LinkType, number>;
  linkDirectionalParticleOffset?: LinkAccessor<NodeType, LinkType, number>;
  linkDirectionalParticleWidth?: LinkAccessor<NodeType, LinkType, number>;
  linkDirectionalParticleColor?: LinkAccessor<NodeType, LinkType, string>;
  linkDirectionalParticleResolution?: number;
  linkDirectionalParticleThreeObject?: LinkAccessor<NodeType, LinkType, Object3D>;

  // Force engine (d3-force) configuration
  forceEngine?: ForceEngine;
  numDimensions?: 1 | 2 | 3;
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
  enableResize?: boolean;
}

export interface ForceGraphExpose extends ForceGraphARInstance {
  wrapperElement: Ref<HTMLElement | null>;
}
export interface ForceGraphEmits<NodeType = {}, LinkType = {}> {
  "dag-error": [loopNodeIds: (string | number)[]];
  "engine-tick": [];
  "engin-stop": [];
  // Interaction
  "node-click": [node: NodeObject<NodeType>];
  "node-hover": [node: NodeObject<NodeType> | null, previousNode: NodeObject<NodeType> | null];
  "link-click": [link: LinkObject<NodeType, LinkType>];
  "link-hover": [
    link: LinkObject<NodeType, LinkType> | null,
    previousLink: LinkObject<NodeType, LinkType> | null,
  ];
}
export const forceGraphEventMap = {
  onDagError: "dag-error",
  onEngineTick: "engine-tick",
  onEngineStop: "engine-stop",
  onNodeClick: "node-click",
  onNodeHover: "node-hover",
  onLinkClick: "link-click",
  onLinkHover: "link-hover",
} as const;
export type ForceGraphEventName = (typeof forceGraphEventMap)[keyof typeof forceGraphEventMap];
export const methodNames: (keyof ForceGraphExpose)[] = [
  // bind methods
  "emitParticle",
  "d3Force",
  "d3ReheatSimulation",
  "refresh",
  "getGraphBbox",
];
export const initPropNames = ["markerAttrs"] as const;
