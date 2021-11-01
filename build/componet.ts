import glob from 'fast-glob'
import { parallel, series } from 'gulp'
import { componentRoot, outputDir, packagesRoot, projectRoot } from './utils/paths'
import path from 'path'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { rollup, OutputOptions } from 'rollup'
import ts from 'rollup-plugin-typescript2'
import vue from 'rollup-plugin-vue'
import { buildConfig } from './utils/config'
import { pathRewriter, run } from './utils'
import { Project, SourceFile, OutputFile } from 'ts-morph'
import fs from 'fs/promises'
import * as VueCompiler from '@vue/compiler-sfc'
async function buildEachComponent() {
    const files = glob.sync('*', {
        cwd: componentRoot,
        onlyDirectories: true
    })
    const builds = files.map(async (file: string) => {
        const input = path.resolve(componentRoot, file, 'index.ts');
        const config = {
            input,
            plugins: [nodeResolve(), vue(), ts(), commonjs()],
            external: (id) => {
                return /^vue/.test(id) || /^@vue-force-graph/.test(id)
            },
            preserveSymlinks: false
        }
        const bundle = await rollup(config)

        const options = Object.values(buildConfig).map(config => ({
            format: config.format,
            file: path.resolve(config.output.path, `components/${file}/index.js`),
            paths: pathRewriter(config.output.name)
        }))
        await Promise.all(
            options.map(option => bundle.write(option as OutputOptions))
        )
    });
    return Promise.all(builds)
}

async function generateTypes() {
    const project = new Project({
        compilerOptions: {
            allowJs: true,
            declaration: true,
            emitDeclarationOnly: true,
            noEmitOnError: true,
            outDir: path.resolve(outputDir, 'types'),
            baseUrl: projectRoot,
            paths: {
                '@vue-force-graph/*': ["packages/*"]
            },
            skipLibCheck: true,
            strict: false
        },
        tsConfigFilePath: path.resolve(projectRoot, 'tsconfig.json'),
        skipAddingFilesFromTsConfig: true
    })
    const filePaths = await glob('**/*', {
        cwd: componentRoot,
        onlyFiles: true,
        absolute: true
    })
    const sourceFiles: SourceFile[] = [];
    await Promise.all(filePaths.map(async (file) => {
        if (file.endsWith('.vue')) {
            const content = await fs.readFile(file, 'utf-8');
            const sfc = VueCompiler.parse(content);
            const { script } = sfc.descriptor;
            if (script) {
                let content = script.content;
                const sourceFile = project.createSourceFile(file + ".ts", content);
                sourceFiles.push(sourceFile)
            }
        } else {
            const sourceFile = project.addSourceFileAtPath(file);
            sourceFiles.push(sourceFile);
        }
    }))
    await project.emit({
        //默认放入内存中
        emitOnlyDtsFiles: true
    })
    const tasks = sourceFiles.map(async (sourceFile: SourceFile) => {
        const emitOutput = sourceFile.getEmitOutput();
        const tasks = emitOutput.getOutputFiles().map(async (outputFile: OutputFile) => {
            const filePath = outputFile.getFilePath()
            await fs.mkdir(path.dirname(filePath), {
                recursive: true
            })
            await fs.writeFile(filePath, pathRewriter('es')(outputFile.getText()))
        })
        await Promise.all(tasks)
    })
    return await Promise.all(tasks)
}
function copyTypes() {
    const src = path.resolve(outputDir, 'types/components/');
    const copy = (module) => {
        let output = path.resolve(outputDir, module, 'components')
        return () => run(`cp -r ${src}/* ${output}`)
    }
    return parallel(copy('es'), copy('lib'))
}
async function buildComponentEntry() {
    const config = {
        input: path.resolve(componentRoot, 'index.ts'),
        plugins: [ts()],
        external: () => true
    }
    const bundle = await rollup(config)
    return Promise.all(
        Object.values(buildConfig).map(config => ({
            format: config.format,
            file: path.resolve(config.output.path, 'components/index.js')
        })).map((option) => bundle.write(option as OutputOptions))
    )

}

export const buildComponent = series(buildEachComponent, generateTypes, copyTypes(), buildComponentEntry)