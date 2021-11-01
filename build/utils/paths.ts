import path from 'path'

export const projectRoot = path.resolve(__dirname, '../../')
export const outputDir = path.resolve(projectRoot, './dist')
export const packagesRoot = path.resolve(projectRoot, './packages')
export const componentRoot = path.resolve(packagesRoot, 'components')
export const vueForceGraphRoot = path.resolve(packagesRoot, 'vue-force-graph')