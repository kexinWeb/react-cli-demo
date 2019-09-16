'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _gulpReplace = require('gulp-replace');

var _gulpReplace2 = _interopRequireDefault(_gulpReplace);

var _stream = require('stream');

var _lodash = require('lodash');

var _vinylFs = require('vinyl-fs');

var _vinylFs2 = _interopRequireDefault(_vinylFs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/** 
* 创建内容替换流
* @param { Object } replacement
* @return {Stream[]}
*/
function createReplaceStream(replacement) {
    if ((0, _lodash.isEmpty)(replacement)) {
        return [];
    }
    return (0, _lodash.map)(replacement, function (to, from) {
        return (0, _gulpReplace2.default)(from, to);
    });
}

/**
 * 创建文件名替换流
 * 
 */
function createFilenameReplaceStream(filenameMap) {
    var stream = new _stream.Transform({ objectMode: true });

    stream._transform = function (data, encoding, cb) {
        var filename = _path2.default.basename(data.path);
        var newFilename = filenameMap[filename];
        if (newFilename) {

            var dirname = _path2.default.dirname(data.path);
            data.path = _path2.default.join(dirname, newFilename);
        }
        cb(null, data);
    };
    return stream;
}

function generate(srcDir, destDir, replacement, filenameMap) {
    return new Promise(function (resolve, reject) {
        function catchError(err) {
            reject(err);
        }
        var allStreams = [_vinylFs2.default.src([srcDir], {
            dot: true,
            nodir: false
        })].concat(_toConsumableArray(createReplaceStream(replacement)), [filenameMap && createFilenameReplaceStream(filenameMap), _vinylFs2.default.dest(destDir)]).filter(function (v) {
            return v;
        });

        // handle all stream error
        allStreams.forEach(function (s) {
            return s.on('error', catchError);
        });

        allStreams.reduce(function (vfs, s) {
            return vfs.pipe(s);
        }).on('finish', function () {
            resolve();
        });
    });
}

exports.default = generate;