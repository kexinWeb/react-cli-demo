import program from 'commander'
import inquirer from 'inquirer'
import chalkPipe from 'chalk-pipe'
import generate from './generate'
import { initSrcDir, initDestDir } from './const'

console.log(initSrcDir)
console.log(initDestDir)

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
    generate(initSrcDir, initDestDir, replacement, filenameMap)
}