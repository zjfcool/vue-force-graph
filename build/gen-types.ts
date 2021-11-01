import glob from 'fast-glob';
import path from 'path';
import { Project, ModuleKind, ScriptTarget, SourceFile } from 'ts-morph';
import { outputDir, projectRoot, vueForceGraphRoot } from './utils/paths';
import fs from 'fs/promises'
import { parallel, series } from 'gulp';
import { run, withTaskName } from './utils';
import { buildConfig } from './utils/config';
async function genEntryTypes() {
    const files = await glob('*.ts', {
        cwd: vueForceGraphRoot,
        absolute: true,
        onlyFiles: true
    })
    const project = new Project({
        compilerOptions: {
            declaration: true,
            module: ModuleKind.ESNext,
            allowJs: true,
            emitDeclarationOnly: true,
            noEmitOnError: false,
            outDir: path.resolve(outputDir, 'entry/types'),
            target: ScriptTarget.ESNext,
            rootDir: vueForceGraphRoot,
            strict: false
        },
        skipAddingFilesFromTsConfig: true,
        tsConfigFilePath: path.resolve(projectRoot, 'package.json'),
        skipFileDependencyResolution: true
    })
    const sourceFiles: SourceFile[] = []
    files.map(file => {
        const sourceFile = project.addSourceFileAtPath(file);
        sourceFiles.push(sourceFile)
    })
    await project.emit({
        emitOnlyDtsFiles: true
    })
    const tasks = sourceFiles.map(async (sourceFile) => {
        const emitOutput = sourceFile.getEmitOutput()
        for (const outputFile of emitOutput.getOutputFiles()) {
            const filePath = outputFile.getFilePath()
            await fs.mkdir(path.dirname(filePath), { recursive: true })
            await fs.writeFile(filePath, outputFile.getText().replaceAll('@vue-force-graph', '.'))
        }
    })
    await Promise.all(tasks)
}
function copyEntryTypes() {
    const src = path.resolve(outputDir, 'entry/types')
    const copy = module => parallel(
        withTaskName(`copyEntryTypes:${module}`, () => run(`cp -r ${src}/* ${path.resolve(outputDir, buildConfig[module].output.path)}/`))
    )
    return parallel(
        copy('esm'),
        copy('cjs')
    )
}
export const genTypes = series(genEntryTypes, copyEntryTypes())