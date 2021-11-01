import path from 'path'
import { outputDir } from './paths'

export const buildConfig = {
    esm: {
        module: "ESNext",
        format: 'esm',
        output: {
            name: 'es',
            path: path.resolve(outputDir, 'es')
        },
        bundle: {
            path: 'vue-force-graph/es'
        }
    },
    cjs: {
        module: "CommonJS",
        format: "cjs",
        output: {
            name: "lib",
            path: path.resolve(outputDir, 'lib')
        },
        bundle: {
            path: 'vue-force-graph/lib'
        }
    }
}
export const BuildConfig = typeof buildConfig;