import program from 'commander'
import inquirer from 'inquirer'
import chalkPipe from 'chalk-pipe'
import generate from './generate'
import { initSrcDir } from './const'
import path from 'path'


let myAnswers = {}
let projectName = ''

program
    .arguments('<projectName>')
    .action((name) => {
        projectName = name;
    });
program.parse(process.argv);


let quesions = [
    {
        type: 'input',
        name: 'name',
        message: '请输入项目名称',
        default: projectName,
        transformer: function (name, answers, flag) {
            return chalkPipe('red.underline')(name)
        },
        validate(input) {
            if (!input) {
                return '输入不能为空（按 ctrl+c 键退出）';
            }
            return true;
        },
    },
    {
        type: 'input',
        name: 'description',
        message: '请输入项目描述',
        default: 'A react application.',
        transformer: function (name, answers, flag) {
            return chalkPipe('red.underline')(name)
        },
        validate(input) {
            if (!input) {
                return '输入不能为空（按 ctrl+c 键退出）';
            }
            return true;
        },
    },
]
if (!projectName) {
    quesions.unshift(
        {
            type: 'input',
            name: 'projectName',
            message: '请输入项目文件夹名称',
            transformer: function (projectName, answers, flag) {
                return chalkPipe('yellow.underline')(projectName)
            },
            validate(input) {
                if (!input) {
                    return '输入不能为空（按 ctrl+c 键退出）';
                }
                return true;
            },
        },
    )
}

inquirer.prompt(quesions)
    .then(answers => {
        myAnswers = answers
        console.log(myAnswers)
        replacement()
    })


function initSuccess(projectName) {
    console.log(`\n\n${projectName} 项目创建成功，接下来你可以：`);
    console.log(`  $ cd ${projectName}`);
    console.log('  $ npm install 安装依赖');
    console.log('  $ npm start 开始开发');
}

function replacement() {
    const replacement = {
        '__PROJECT_NAME__': myAnswers.name,
        '__PROJECT_DESCRIPTION__': myAnswers.description
    }
    projectName = projectName ? projectName : myAnswers.projectName
    const initDestDir = path.resolve(process.cwd(), projectName)

    generate(initSrcDir, initDestDir, replacement, {})
        .then(() => {
            initSuccess(projectName)
        })
        .catch(err => {
            console.log(err)
        })
}