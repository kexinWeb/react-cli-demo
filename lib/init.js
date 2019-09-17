'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _chalkPipe = require('chalk-pipe');

var _chalkPipe2 = _interopRequireDefault(_chalkPipe);

var _generate = require('./generate');

var _generate2 = _interopRequireDefault(_generate);

var _const = require('./const');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var myAnswers = {};
var projectName = '';

_commander2.default.arguments('<projectName>').action(function (name) {
    projectName = name;
});
_commander2.default.parse(process.argv);

var quesions = [{
    type: 'input',
    name: 'name',
    message: '请输入项目名称',
    default: projectName,
    transformer: function transformer(name, answers, flag) {
        return (0, _chalkPipe2.default)('red.underline')(name);
    },
    validate: function validate(input) {
        if (!input) {
            return '输入不能为空（按 ctrl+c 键退出）';
        }
        return true;
    }
}, {
    type: 'input',
    name: 'description',
    message: '请输入项目描述',
    default: 'A react application.',
    transformer: function transformer(name, answers, flag) {
        return (0, _chalkPipe2.default)('red.underline')(name);
    },
    validate: function validate(input) {
        if (!input) {
            return '输入不能为空（按 ctrl+c 键退出）';
        }
        return true;
    }
}];
if (!projectName) {
    quesions.unshift({
        type: 'input',
        name: 'projectName',
        message: '请输入项目文件夹名称',
        transformer: function transformer(projectName, answers, flag) {
            return (0, _chalkPipe2.default)('yellow.underline')(projectName);
        },
        validate: function validate(input) {
            if (!input) {
                return '输入不能为空（按 ctrl+c 键退出）';
            }
            return true;
        }
    });
}

_inquirer2.default.prompt(quesions).then(function (answers) {
    myAnswers = answers;
    console.log(myAnswers);
    replacement();
});

function initSuccess(projectName) {
    console.log('\n\n' + projectName + ' \u9879\u76EE\u521B\u5EFA\u6210\u529F\uFF0C\u63A5\u4E0B\u6765\u4F60\u53EF\u4EE5\uFF1A');
    console.log('  $ cd ' + projectName);
    console.log('  $ npm install 安装依赖');
    console.log('  $ npm start 开始开发');
}

function replacement() {
    // 进一步抽象
    var replacement = {
        '__PROJECT_NAME__': myAnswers.name,
        '__PROJECT_DESCRIPTION__': myAnswers.description
    };
    projectName = projectName ? projectName : myAnswers.projectName;
    var initDestDir = _path2.default.resolve(process.cwd(), projectName);

    (0, _generate2.default)(_const.initSrcDir, initDestDir, replacement, {}).then(function () {
        initSuccess(projectName);
    }).catch(function (err) {
        console.log(err);
    });
}