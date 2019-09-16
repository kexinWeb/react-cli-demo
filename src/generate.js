import replaceStream from 'gulp-replace'
import { Transform } from 'stream'
import { isEmpty, map } from 'lodash'
import vfs from 'vinyl-fs'
import path from 'path'
/** 
* 创建内容替换流
* @param { Object } replacement
* @return {Stream[]}
*/
function createReplaceStream(replacement) {
    if (isEmpty(replacement)) {
        return []
    }
    return map(replacement, (to, from) => {
        return replaceStream(from, to)
    })
}

/**
 * 创建文件名替换流
 * 
 */
function createFilenameReplaceStream(filenameMap) {
    const stream = new Transform({ objectMode: true })

    stream._transform = (data, encoding, cb) => {
        const filename = path.basename(data.path)
        const newFilename = filenameMap[filename]
        if (newFilename) {

            const dirname = path.dirname(data.path)
            data.path = path.join(dirname, newFilename)
        }
        cb(null, data)
    }
    return stream
}

function generate(srcDir, destDir, replacement, filenameMap) {
        return new Promise((resolve, reject) => {
            function catchError(err) {
                reject(err);
            }
            const allStreams = [
                vfs.src([srcDir], {
                    dot: true,
                    nodir: false
                }),
                ...createReplaceStream(replacement),
                filenameMap && createFilenameReplaceStream(filenameMap),
                vfs.dest(destDir)
            ].filter(v => v)

            // handle all stream error
            allStreams.forEach(s => s.on('error', catchError))

            allStreams
                .reduce((vfs, s) => vfs.pipe(s))
                .on('finish', () => {
                    resolve();
                });
        })
}

export default generate