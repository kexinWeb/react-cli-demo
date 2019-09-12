import vfs from 'vinyl-fs'
const path = require('path')
const replaceStream = require('gulp-replace')
const { Transform } = require('stream')
const { isEmpty, map } = require('lodash')
import program from 'commander'
import inquirer from 'inquirer'
import chalkPipe from 'chalk-pipe'

let myAnswers = {}
// commander：不同的command复制不同的文件
program
    .option('-p, --pizza', 'the taste of pizza')
    .parse(process.argv)

if (program.pizza) {
    console.log('order a pizza')
}

inquirer.prompt([{
    type: 'input',
    name: 'name',
    message: '请输入你的名字',
    transformer: function (name, answers, flag) {
        return chalkPipe('red.underline')(name)
    }
},
{
    type: 'input',
    name: 'province',
    message: '你来自什么省份？',
    transformer: function (province, answers, flag) {
        return chalkPipe('blue.underline')(province)
    }
}]
)
    .then(answers => {
        myAnswers = answers
        console.log(myAnswers)
        replacement()
    })

function replacement() {
    // 进一步抽象
    const replacement = {
        '__NAME__': myAnswers.name,
        '__PROVINCE__': myAnswers.province
    }

    const filenameMap = {
        'name.js': 'nameRenamed.js',
        'province.js': 'provinceRenamed.js'
    }

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

    vfs.src([path.resolve(__dirname, '../boilerplates/**/*')], {
        dot: true,
        nodir: false
    })
        .pipe(createReplaceStream(replacement)[0])
        .pipe(createReplaceStream(replacement)[1])
        .pipe(createFilenameReplaceStream(filenameMap))
        .pipe(vfs.dest(path.join(__dirname, '../output/routes')));
}
