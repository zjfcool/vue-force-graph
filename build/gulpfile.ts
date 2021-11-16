import { series, parallel } from 'gulp'
import { genTypes } from './gen-types'
import { run, withTaskName } from './utils'
import { outputDir, projectRoot, vueForceGraphRoot } from './utils/paths'

async function copySourceCode() {
    await run(`cp ${vueForceGraphRoot}/package.json ${outputDir}/package.json`)
    await run(`cp ${projectRoot}/README.md ${outputDir}/README.md`)
}
export default series(
    withTaskName('clean', async () => run('rm -rf ./dist')),
    parallel(
        withTaskName('buildPackages', async () => run('pnpm run --filter ./packages --parallel build')),
        withTaskName('buildFullComponent', () => run('pnpm run build buildFullComponent')),
        withTaskName('buildComponent', () => run('pnpm run build buildComponent'))
    ),
    parallel(
        genTypes,
        copySourceCode
    )
)
export * from './componet'
export * from './full-component'