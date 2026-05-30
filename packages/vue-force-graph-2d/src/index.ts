import component from "./ForceGraph2D.vue";
import { withInstall } from "utils";
export default withInstall(component);

export type {
  ForceGraphProps as ForceGraph2DProps,
  ForceGraphEmits as ForceGraph2DEmits,
  ForceGraphExpose as ForceGraph2DExpose,
  GraphData as ForceGraph2DData,
  NodeObject as ForceGraph2DNodeObject,
  LinkObject as ForceGraph2DLinkObject,
  DagMode as ForceGraph2DDagMode,
} from "./forceGraph2D";
