'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addDestDir = exports.addSrcDir = exports.initDestDir = exports.initSrcDir = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initSrcDir = exports.initSrcDir = _path2.default.resolve(__dirname, '../boilerplates/**/*');
var initDestDir = exports.initDestDir = _path2.default.resolve(process.cwd(), './output');
var addSrcDir = exports.addSrcDir = _path2.default.resolve(__dirname, '../boilerplates/**/*');
var addDestDir = exports.addDestDir = _path2.default.resolve(__dirname, '../output/routes');