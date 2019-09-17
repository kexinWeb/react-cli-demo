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
var routeName = void 0;

_commander2.default.arguments('<routeName>').action(function (name) {
    routeName = name;
});
_commander2.default.parse(process.argv);

var questions = [{
    type: 'input',
    name: 'routePath',
    message: '请输入路由访问的 PATH（如：/index）',
    validate: function validate(input) {
        if (!input) {
            return '输入不能为空（按 ctrl+c 键退出）';
        }
        return true;
    }
}, {
    type: 'input',
    name: 'routeTitle',
    message: '请输入路由名称（如：首页）'
}, {
    type: 'input',
    name: 'namespace',
    message: '请输入该页面组件的namespace（如：index）'
}];

if (!routeName) {
    questions.unshift({
        type: 'input',
        name: 'routeName',
        message: '请输入路由页面的名称，它将作为文件夹名（如: index）',
        transformer: function transformer(routeName, answers, flag) {
            return (0, _chalkPipe2.default)('red.underline')(routeName);
        },
        validate: function validate(input) {
            if (!input) {
                return '输入不能为空（按 ctrl+c 键退出）';
            }
            return true;
        }
    });
}

function initSuccess(routeName, routePath) {
    console.log('\n\n' + routeName + ' \u8DEF\u7531\u9875\u9762\u521B\u5EFA\u6210\u529F\uFF0C\u63A5\u4E0B\u6765\u4F60\u53EF\u4EE5\uFF1A');
    console.log('  $ npm start 开始开发');
    console.log('  \u901A\u8FC7 localhost:8080' + routePath + ' \u8BBF\u95EE\u8BE5\u8DEF\u7531\u9875\u9762');
}

_inquirer2.default.prompt(questions).then(function (answers) {
    myAnswers = answers;
    replacement();
});

function replacement() {
    var replacement = {
        '__ROUTE_PATH__': myAnswers.routePath,
        '__ROUTE_NAMESPACE__': myAnswers.namespace,
        '__REPLACE_ROUTE_TITLE__': myAnswers.routeTitle
    };
    var addDestDir = _path2.default.resolve(process.cwd(), routeName ? 'app/routes/' + routeName : 'app/routes/' + myAnswers.routeName);

    (0, _generate2.default)(_const.addSrcDir, addDestDir, replacement, {}).then(function () {
        initSuccess(routeName ? routeName : myAnswers.routeName, myAnswers.routePath);
    }).catch(function (err) {
        console.log(err);
    });
}