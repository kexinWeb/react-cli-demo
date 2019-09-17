import program from 'commander'
import inquirer from 'inquirer'
import chalkPipe from 'chalk-pipe'
import generate from './generate'
import { addSrcDir } from './const'
import path from 'path'


let myAnswers = {}
let routeName

program
    .arguments('<routeName>')
    .action((name) => {
        routeName = name;
    });
program.parse(process.argv);


const questions = [{
    type: 'input',
    name: 'routePath',
    message: '请输入路由访问的 PATH（如：/index）',
    validate(input) {
        if (!input) {
            return '输入不能为空（按 ctrl+c 键退出）';
        }
        return true;
    },
},
    {
        type: 'input',
        name: 'routeTitle',
        message: '请输入路由名称（如：首页）',
    },
    {
        type: 'input',
        name: 'namespace',
        message: '请输入该页面组件的namespace（如：index）',
    },
]

if (!routeName) {
    questions.unshift({
        type: 'input',
        name: 'routeName',
        message: '请输入路由页面的名称，它将作为文件夹名（如: index）',
        transformer: function (routeName, answers, flag) {
            return chalkPipe('red.underline')(routeName)
        },
        validate(input) {
            if (!input) {
                return '输入不能为空（按 ctrl+c 键退出）';
            }
            return true;
        },
    })
}

function initSuccess(routeName, routePath) {
    console.log(`\n\n${routeName} 路由页面创建成功，接下来你可以：`);
    console.log('  $ npm start 开始开发');
    console.log(`  通过 localhost:8080${routePath} 访问该路由页面`);
}

inquirer.prompt(questions)
    .then(answers => {
        myAnswers = answers
        replacement()
    })

function replacement() {
    const replacement = {
        '__ROUTE_PATH__': myAnswers.routePath,
        '__ROUTE_NAMESPACE__': myAnswers.namespace,
        '__REPLACE_ROUTE_TITLE__': myAnswers.routeTitle
    }
    const addDestDir = path.resolve(process.cwd(), routeName ? `app/routes/${routeName}` : `app/routes/${myAnswers.routeName}`)

    generate(addSrcDir, addDestDir, replacement, {})
        .then(() => {
            initSuccess(routeName ? routeName : myAnswers.routeName, myAnswers.routePath)
        })
        .catch(err => {
            console.log(err)
        })
}