import type { ExtractPropTypes } from 'vue'
export const vueForceGraph2DProps = {
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

    linkLineDash: {
        type: [Array, String, Function],
        validator(v) {
            return Array.isArray(v) ? v.every(item => typeof item === 'number') : typeof v === 'string' || typeof v === 'function'
        }
    },
    nodeCanvasObjectMode: [String, Function],
    nodeCanvasObject: Function,
    nodePointerAreaPaint: Function,
    linkCanvasObjectMode: [String, Function],
    linkCanvasObject: Function,
    linkPointerAreaPaint: Function,
    autoPauseRedraw: Boolean,
    minZoom: Number,
    maxZoom: Number,
    enableZoomInteraction: {
        type: Boolean,
        default: true
    },
    enablePanInteraction: {
        type: Boolean,
        default: true
    },
    onZoom: Function,
    onZoomEnd: Function,
    onRenderFramePre: Function,
    onRenderFramePost: Function

}
export type VueForceGraph2DProps = ExtractPropTypes<typeof vueForceGraph2DProps>