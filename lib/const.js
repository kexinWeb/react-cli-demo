'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addDestDir = exports.addSrcDir = exports.initSrcDir = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initSrcDir = exports.initSrcDir = _path2.default.resolve(__dirname, '../boilerplates/project/**/*');
var addSrcDir = exports.addSrcDir = _path2.default.resolve(__dirname, '../boilerplates/route/**/*');
var addDestDir = exports.addDestDir = _path2.default.resolve(process.cwd(), './output/routes');