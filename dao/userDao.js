/**
 * Created by SWSD on 2017-03-06.
 */
var $conf = require("./../conf/db");
var $sql = require('./userSqlMapping');
var fileuuid = require('./../util/uuidHelper');

var mysql = require('mysql');
// var query = require('./../util/DBHelper');
//创建连接池
var pool = mysql.createPool($conf);
//上传文件至七牛云服务
var qiniu = require("qiniu");
//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = 'E0ehWlaL0yjRbRmjlHOdAj5KRMfYl2P86Jy13d2E';
qiniu.conf.SECRET_KEY = 'DSgn1LP6qbUXQbH_Qzua9ajzwCGROg_hzcDmcpC4';
var bucket = 'lvren';//要上传的空间


//构建上传策略函数
function uptoken(bucket, filename) {
    var putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + filename);
    return putPolicy.token();
}
//构造上传函数
function uploadFile(uptoken, filename, localFile, callback) {
    var extra = new qiniu.io.PutExtra();
    qiniu.io.putFile(uptoken, filename, localFile, extra, function (err, ret) {
        if (!err) {// 上传成功， 处理返回值
            console.log(ret.hash, ret.key, ret.persistentId);
            let url = `http://olb1e0iqk.bkt.clouddn.com/${ret.key}`;
            callback({url});
        } else {// 上传失败， 处理返回代码
            callback({err});
        }
    });
}

function uploadImg(original, callback) {
    var facename = fileuuid.fileUUID(original.originalFilename);//上传到七牛后保存的文件名

    var token = uptoken(bucket, facename);//生成上传 Token
    var filePath = original.path;//要上传文件的本地路径
    uploadFile(token, facename, filePath, callback);//调用uploadFile上传
}
function uploadImgs(original, callback) {
    original.map(item=> {
        uploadImg(original, callback);
    });

}

function getCards(start, acount, res, callback) {

    console.log("===================getface");
    console.log("===================start==" + start);
    console.log("===================acount" + acount);
    pool.getConnection(function (err, connection) {
        connection.query($sql.sqltotal, function (err, total) {
            if (err) {
                console.log("total错误：" + err.message);
            }
            else {
                connection.query($sql.sqllimit, [start, acount], function (err, result) {
                    connection.release();
                    if (err) {
                        console.log("sqllimit错误：" + err.message);
                    }
                    else {
                        console.log('~~~~~~~~~~~~~~~' + total[0])
                        callback({totals: total[0], results: result});
                    }
                });
            }
        });
    })

}
var card_inner = function (req, res, tid) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.sqlContent, [tid], function (err, content) {
            if (err) {
                console.log(err.message)
            }
            else {
                connection.query($sql.sqlMsg, [tid], function (err, msg) {
                    connection.query($sql.sqlReply, [tid], function (err, reply) {
                        connection.release();
                        console.log('>>>>>>>>>', content)
                        res.render("cardDetail", {
                            card: content[0],
                            msg: msg,
                            rep: reply,
                            // sessionId: req.session.userId
                        });
                    })
                })
            }

        });
    });
};


/*七牛云相关服务的应用 =====end*/


function addCard(req, res) {

    console.log(">>>>", req.body);
    console.log(">>>>", req.files);


    // let photos=req.files.photos;
    // for(let i=0;i<photos.length;i++){
    //
    // }
    uploadImg(req.files.face, function (data) {
        if (data.url) {
            pool.getConnection(function (err, connection) {
                connection.query($sql.addCard, [tid], function (err, content) {
                    connection.release();
                    if (err) {
                        console.log(err.message)
                    }
                    else {

                    }

                });
            });
            // res.json({code:200,url:data.url})
        }
        else {
            // res.json({code:500})
        }
    });

    uploadImg(req.files.photos, function (data) {

    });


    //    todo:将filename存入数据库
}
exports.getCards = getCards;
exports.card_inner = card_inner;
exports.addCard = addCard;