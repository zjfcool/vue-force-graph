<script lang="ts">
import fromKampsule from "@vue-force-graph/utils/from-kapsule";
import ForceGraphAR from "3d-force-graph-ar";
//@ts-ignore
import { vueForceGraphARProps } from "./vue-force-graph-ar.ts";

export default fromKampsule(ForceGraphAR, {
  name: "VueForceGraphAR",
  methodNames: [
    "getGraphBbox",
    "emitParticle",
    "d3Force",
    "d3ReheatSimulation",
    "refresh",
  ],
  initPropNames: ["markerAttrs"],
  props: vueForceGraphARProps,
});
</script>
