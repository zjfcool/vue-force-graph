import component from "./ForceGraphVR.vue";
import { withInstall } from "utils";

export default withInstall(component);

export type {
  ForceGraphProps as ForceGraphVRProps,
  ForceGraphEmits as ForceGraphVREmits,
  ForceGraphExpose as ForceGraphVRExpose,
  GraphData as ForceGraphVRData,
  NodeObject as ForceGraphVRNodeObject,
  LinkObject as ForceGraphVRLinkObject,
  DagMode as ForceGraphVRDagMode,
} from "./forceGraphVR";
