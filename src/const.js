import path from 'path'
export const initSrcDir = path.resolve(__dirname, '../boilerplates/**/*')
export const initDestDir = path.join(process.cwd(), './output')
export const addSrcDir = path.resolve(__dirname, '../boilerplates/**/*')
export const addDestDir = path.join(__dirname, '../output/routes')
