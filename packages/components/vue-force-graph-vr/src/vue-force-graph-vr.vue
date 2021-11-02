<script lang="ts">
import fromKampsule from "@vue-force-graph/utils/from-kapsule";
import ForceGraphVR from "3d-force-graph-vr";
//@ts-ignore
import { vueForceGraphVRProps } from "./vue-force-graph-vr.ts";

export default fromKampsule(ForceGraphVR, {
  methodNames: [
    "getGraphBbox",
    "emitParticle",
    "d3Force",
    "d3ReheatSimulation",
    "refresh",
  ],
  name: "VueForceGraphVR",
  props: vueForceGraphVRProps,
});
</script>
