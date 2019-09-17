import path from 'path'
export const initSrcDir = path.resolve(__dirname, '../boilerplates/project/**/*')
export const addSrcDir = path.resolve(__dirname, '../boilerplates/route/**/*')
export const addDestDir = path.resolve(process.cwd(), './output/routes')
