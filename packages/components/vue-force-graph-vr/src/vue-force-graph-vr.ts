import type { ExtractPropTypes } from 'vue'

export const vueForceGraphVRProps = {
    width: Number,
    height: Number,
    graphData: {
        type: Object,
        required: true,
        validator(v) {
            return v.nodes && v.links;
        },
    },
    backgroundColor: String,
    nodeRelSize: Number,
    nodeId: String,
    nodeLabel: [String, Function],
    nodeVal: [Number, String, Function],
    nodeVisibility: {
        type: [Boolean, String, Function],
        default: true,
    },
    nodeColor: [String, Function],
    nodeAutoColorBy: [String, Function],
    onNodeHover: Function,
    onNodeClick: Function,
    linkSource: String,
    linkTarget: String,
    linkLabel: [String, Function],
    linkVisibility: {
        type: [Boolean, String, Function],
        default: true,
    },
    linkColor: [String, Function],
    linkAutoColorBy: [String, Function],
    linkWidth: [Number, String, Function],
    linkCurvature: [Number, String, Function],
    linkDirectionalArrowLength: [Number, String, Function],
    linkDirectionalArrowColor: [String, Function],
    linkDirectionalArrowRelPos: [Number, String, Function],
    linkDirectionalParticles: [Number, String, Function],
    linkDirectionalParticleSpeed: [Number, String, Function],
    linkDirectionalParticleWidth: [Number, String, Function],
    linkDirectionalParticleColor: [String, Function],
    onLinkHover: Function,
    onLinkClick: Function,
    dagMode: {
        validator(v) {
            return [
                "td",
                "bu",
                "lr",
                "rl",
                "zin",
                "zout",
                "radialin",
                "radialout",
            ].includes(v);
        },
    },
    dagLevelDistance: Number,
    dagNodeFilter: Function,
    onDagError: Function,
    d3AlphaMin: Number,
    d3AlphaDecay: Number,
    d3VelocityDecay: Number,
    warmupTicks: Number,
    cooldownTicks: Number,
    cooldownTime: Number,
    onEngineTick: Function,
    onEngineStop: Function,
    getGraphBbox: Function,
    zoomToFit: Function,
    onNodeRightClick: Function,
    onNodeDrag: Function,
    onNodeDragEnd: Function,
    onLinkRightClick: Function,
    linkHoverPrecision: Number,
    onBackgroundClick: Function,
    onBackgroundRightClick: Function,
    enablePointerInteraction: {
        type: Boolean,
        default: true,
    },
    enableNodeDrag: {
        type: Boolean,
        default: true,
    },

    showNavInfo: {
        type: Boolean,
        default: true,
    },
    nodeOpacity: Number,
    nodeResolution: Number,
    nodeThreeObject: [Object, String, Function],
    nodeThreeObjectExtend: {
        type: [Boolean, String, Function],
        default: false,
    },
    linkOpacity: Number,
    linkResolution: Number,
    linkCurveRotation: [Number, String, Function],
    linkMaterial: [Object, String, Function],
    linkThreeObject: [Object, String, Function],
    linkThreeObjectExtend: {
        type: [Boolean, String, Function],
        default: false,
    },
    linkPositionUpdate: Function,
    linkDirectionalArrowResolution: Number,
    linkDirectionalParticleResolution: Number,
    forceEngine: {
        validator(v) {
            return ["d3", "ngraph"].includes(v);
        },
    },
    ngraphPhysics: Object,
    numDimensions: {
        validator(v) {
            return [1, 2, 3].includes(v);
        },
    },

    nodeDesc: [String, Function],
    linkDesc: [String, Function]
}

export type VueForceGraphVRProps = ExtractPropTypes<typeof vueForceGraphVRProps>