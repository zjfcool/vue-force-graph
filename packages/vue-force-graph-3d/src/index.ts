import component from "./ForceGraph3D.vue";
import { withInstall } from "utils";

export default withInstall(component);

export type {
  ForceGraphProps as ForceGraph3DProps,
  ForceGraphEmits as ForceGraph3DEmits,
  ForceGraphExpose as ForceGraph3DExpose,
  GraphData as ForceGraph3DData,
  NodeObject as ForceGraph3DNodeObject,
  LinkObject as ForceGraph3DLinkObject,
  DagMode as ForceGraph3DDagMode,
} from "./forceGraph3D";
