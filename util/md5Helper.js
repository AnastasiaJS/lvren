/**
 * Created by Administrator on 2016/9/19.
 */
var crypto = require('crypto');

function pwdMd5(pwd) {
    var hash = crypto.createHash("md5");
    hash.update(pwd);          //直接对"123456"字符串加密
    return hash.digest('hex');
}

exports.pwdMd5=pwdMd5;