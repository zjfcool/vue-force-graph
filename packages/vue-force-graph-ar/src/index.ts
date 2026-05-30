import component from "./ForceGraphAR.vue";
import { withInstall } from "utils";

export default withInstall(component);

export type {
  ForceGraphProps as ForceGraphARProps,
  ForceGraphEmits as ForceGraphAREmits,
  ForceGraphExpose as ForceGraphARExpose,
  GraphData as ForceGraphARData,
  NodeObject as ForceGraphARNodeObject,
  LinkObject as ForceGraphARLinkObject,
  DagMode as ForceGraphARDagMode,
} from "./forceGraphAR";
