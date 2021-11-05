import type { ExtractPropTypes } from 'vue'

export const contextMenuProps = {
    bindType: {
        type: String,
        default: "node",
        validator: (v) => {
            return ["node", "edge", 'canvas'].includes(v)
        }
    },
    mode: {
        type: String,
        default: '2d',
        validator: (v) => {
            return ['2d', '3d', 'ar', 'vr'].includes(v)
        }
    },
    width: {
        type: [Number, String],
        default: 100
    },
    height: {
        type: [Number, String],
        default: "auto"
    },
    backgroundColor: {
        type: String,
        default: "rgba(0,0,0,0)"
    }
}
export type ContextMenuProps = ExtractPropTypes<typeof contextMenuProps>