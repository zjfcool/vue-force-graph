import { parallel, series, src, dest } from 'gulp'
import { buildConfig } from './utils/config'
import path from 'path'
import { withTaskName } from './utils'
import { outputDir, projectRoot } from './utils/paths'
import ts from 'gulp-typescript'
export const buildPackages = (pkgPath: string, pkgName: string) => {
    const tasks = Object.entries(buildConfig).map(([module, config]) => {
        const output = path.resolve(pkgPath, config.output.name)
        return series(
            withTaskName(`build:${pkgName}`, () => {
                const tsConfigPath = path.resolve(projectRoot, 'tsconfig.json')
                const inputs = ['**/*.ts', '!gulpfile.ts', '!node_modules', path.resolve(projectRoot, 'typings', '*.d.ts'),]
                return src(inputs).pipe(
                    ts.createProject(tsConfigPath, {
                        module: config.module,
                        declaration: true,
                        moduleResolution: 'node',
                        strict: false,
                    })()
                ).pipe(dest(output))
            }),
            withTaskName(`copy:${pkgName}`, () => {
                return src(`${output}/**`).pipe(dest(
                    path.resolve(outputDir, config.output.name, pkgName)
                ))
            })
        )

    })
    return parallel(...tasks)
}
