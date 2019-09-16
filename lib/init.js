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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_const.initSrcDir);
console.log(_const.initDestDir);

var myAnswers = {};
// commander：不同的command复制不同的文件
_commander2.default.option('-p, --pizza', 'the taste of pizza').parse(process.argv);

if (_commander2.default.pizza) {
    console.log('order a pizza');
}

_inquirer2.default.prompt([{
    type: 'input',
    name: 'name',
    message: '请输入你的名字',
    transformer: function transformer(name, answers, flag) {
        return (0, _chalkPipe2.default)('red.underline')(name);
    }
}, {
    type: 'input',
    name: 'province',
    message: '你来自什么省份？',
    transformer: function transformer(province, answers, flag) {
        return (0, _chalkPipe2.default)('blue.underline')(province);
    }
}]).then(function (answers) {
    myAnswers = answers;
    console.log(myAnswers);
    replacement();
});

function replacement() {
    // 进一步抽象
    var replacement = {
        '__NAME__': myAnswers.name,
        '__PROVINCE__': myAnswers.province
    };

    var filenameMap = {
        'name.js': 'nameRenamed.js',
        'province.js': 'provinceRenamed.js'
    };
    (0, _generate2.default)(_const.initSrcDir, _const.initDestDir, replacement, filenameMap);
}