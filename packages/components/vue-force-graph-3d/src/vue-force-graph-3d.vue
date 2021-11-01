<script lang="ts">
import fromKapsule from "@vue-force-graph/utils/from-kapsule";
import ForceGraph3D from "3d-force-graph";
// @ts-ignore
import { vueForceGraph3DProps } from "./vue-force-graph-3d.ts";

export default fromKapsule(ForceGraph3D, {
  methodNames: [
    // bind methods
    "emitParticle",
    "d3Force",
    "d3ReheatSimulation",
    "stopAnimation",
    "pauseAnimation",
    "resumeAnimation",
    "cameraPosition",
    "zoomToFit",
    "getGraphBbox",
    "screen2GraphCoords",
    "graph2ScreenCoords",
    "postProcessingComposer",
    "scene",
    "camera",
    "renderer",
    "controls",
    "refresh",
  ],
  initPropNames: ["controlType", "rendererConfig", "extraRenderers"],
  props: vueForceGraph3DProps,
  name: "VueForceGraph3D",
});
</script>
