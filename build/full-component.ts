import path from 'path'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import vue from 'rollup-plugin-vue'
import { rollup, OutputOptions } from 'rollup'
import { outputDir, vueForceGraphRoot } from './utils/paths'
import { parallel } from 'gulp'
import fs from 'fs/promises'
import { buildConfig } from './utils/config'
import { pathRewriter } from './utils'
import pkg from '../packages/vue-force-graph/package.json'
const { dependencies } = pkg

async function buildFull() {
    const config = {
        input: path.resolve(vueForceGraphRoot, 'index.ts'),
        plugins: [nodeResolve(), vue(), typescript(), commonjs()],
        external: (id) => /^vue/.test(id)
    }
    // esm umd 打包方式
    const buildConfig = [
        {
            format: "umd",
            file: path.resolve(outputDir, 'index.js'),
            name: "VueForceGraph",
            exports: "named",
            globals: {
                vue: 'Vue'
            }
        },
        {
            format: "esm",
            file: path.resolve(outputDir, 'index.esm.js')
        }
    ]
    const bundle = await rollup(config);
    return Promise.all(
        buildConfig.map(config => bundle.write(config as OutputOptions))
    )

}
async function buildEntry() {
    const entryFiles = await fs.readdir(vueForceGraphRoot, { withFileTypes: true })
    const entryPoints = entryFiles
        .filter(f => f.isFile())
        .filter(f => !['package.json'].includes(f.name))
        .map(f => path.resolve(vueForceGraphRoot, f.name))
    const config = {
        input: entryPoints,
        plugins: [nodeResolve(), vue(), typescript()],
        external: (id) => /^vue/.test(id) || /^@vue-force-graph/.test(id) || Object.keys(dependencies).some(str => new RegExp(`^${str}$`).test(id))
    }
    const bundle = await rollup(config)
    return Promise.all(
        Object.values(buildConfig).map(config => ({
            format: config.format,
            dir: config.output.path,
            paths: pathRewriter(config.output.name)

        })).map(option => bundle.write(option as OutputOptions))
    )
}



export const buildFullComponent = parallel(buildFull, buildEntry)