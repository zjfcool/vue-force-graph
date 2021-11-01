<script lang="ts">
import fromKapsule from "@vue-force-graph/utils/from-kapsule";
import ForceGraph2D from "force-graph";
// @ts-ignore
import { vueForceGraph2DProps } from "./vue-force-graph-2d.ts";

export default fromKapsule(ForceGraph2D, {
  methodNames: [
    // bind methods
    "emitParticle",
    "d3Force",
    "d3ReheatSimulation",
    "stopAnimation",
    "pauseAnimation",
    "resumeAnimation",
    "centerAt",
    "zoom",
    "zoomToFit",
    "getGraphBbox",
    "screen2GraphCoords",
    "graph2ScreenCoords",
  ],
  props: vueForceGraph2DProps,
  name: "VueForceGraph2D",
});
</script>
