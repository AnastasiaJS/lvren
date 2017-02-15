/**
 * Created by Administrator on 2016/9/19.
 */
var uuid = require('node-uuid');

function fileUUID(filename) {
    var v = uuid.v4();
    var suffix = filename.substr(filename.lastIndexOf("."));
    return v + suffix;
}

exports.fileUUID=fileUUID;