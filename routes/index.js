var express = require('express');
var multipart = require('connect-multiparty');
var router = express.Router();
var fileuuid = require('./../util/uuidHelper');
var userDao = require('./../dao/userDao');


var qiniu = require("qiniu");
//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = 'E0ehWlaL0yjRbRmjlHOdAj5KRMfYl2P86Jy13d2E';
qiniu.conf.SECRET_KEY = 'DSgn1LP6qbUXQbH_Qzua9ajzwCGROg_hzcDmcpC4';



//构建上传策略函数
function uptoken(bucket, filename) {
    var putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + filename);
    return putPolicy.token();
}
//构造上传函数
function uploadFile(uptoken,filename, localFile,res) {
    var extra = new qiniu.io.PutExtra();
    qiniu.io.putFile(uptoken,filename, localFile, extra, function (err, ret) {
        if (!err) {// 上传成功， 处理返回值
            console.log(ret.hash, ret.key, ret.persistentId);
            let url=`http://olb1e0iqk.bkt.clouddn.com/${ret.key}`;
            res.json({code:200,url:url})
        } else {// 上传失败， 处理返回代码
            console.log(err);
        }
    });
}





/* GET home page. */
router.get('/', function (req, res, next) {

    userDao.getCards(0, 6, res, function (result) {
        res.render('index',{face:result.results})
    });
    // res.render('index', {title: '旅人'});
});
router.get('/addCard', function (req, res, next) {
    res.render('addCard', {title: '添加旅人卡'});
});

//单文件上传处理，使用七牛云服务
router.post('/upload', multipart(), function (req, res, next) {
    console.log(">>>>", req.files);

    var bucket = 'lvren';//要上传的空间

    var filename = fileuuid.fileUUID(req.files.logo.originalFilename);//上传到七牛后保存的文件名
//    todo:将filename存入数据库

    var token = uptoken(bucket, filename);//生成上传 Token

    var filePath = req.files.logo.path;//要上传文件的本地路径

    uploadFile(token,filename, filePath,res);//调用uploadFile上传
});


module.exports = router;
