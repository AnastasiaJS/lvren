/**
 * Created by SWSD on 2017-03-06.
 */
var $conf = require("./../conf/db");
var $sql = require('./userSqlMapping');
var fileuuid = require('./../util/uuidHelper');
var pwdMd5 = require('./../util/md5Helper');

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
            callback(Object.assign({}, {url}, {code: 200}))
        } else {// 上传失败， 处理返回代码
            callback(Object.assign({}, {err}, {code: 500}))

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
    let photos = [];
    let newData = {};
    original.map((item, index)=> {
        uploadImg(item, function (data) {
            photos[index] = data.url;
            // console.log('url>>>>>', photos[index]);
            newData = Object.assign({}, {code: data.code, err: data.err});
            // if(index==original.length-1){
            //     console.log('photos>>>>', photos);
            //     console.log('newData>>>>', newData);
            //     callback(Object.assign({}, {code: newData.code, photos}));
            //
            // }
        });
    });
    setTimeout(function () {
        callback(Object.assign({}, {code: newData.code, photos}));
    }, 5000);


}

/*七牛云相关服务的应用 =====end*/
function getCards(start, acount, res, callback) {

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
                        console.log('>>>>>>>>>', content);
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


function addCard(req, res) {

    console.log(">>>>", req.body);
    console.log(">>>>", req.files);

    uploadImg(req.files.facePic, function (data) {
        let body = req.body;

        if (data.code == 200) {

            let canCut = body.canCut ? "是" : "否";
            let other = body.other ? body.other : "";
            console.log("canCut>>>>>", canCut)
            uploadImgs(req.files.photos, function (datas) {
                if (datas.code == 200) {
                    pool.getConnection(function (err, connection) {
                        connection.query($sql.addCard, ['2', body.title, body.about,
                            body.price, canCut, body.play, other, body.appointTime,
                            body.aboutPrice, data.url, datas.photos.join(',')], function (err, result) {
                            connection.release();
                            if (err) {
                                console.log(err.message)
                            }
                            else {
                                res.json({code: 200})
                            }

                        });
                    });
                } else {
                    res.json({code: 500})
                }
            });
        }
        else {
            res.json({code: 500})
        }
    });


    //    todo:将filename存入数据库
}

function login(req, res) {
    var uid = req.body.uid;
    var pwd = req.body.password;
    //直接对"123456"字符串加密
    var encode = pwdMd5.pwdMd5(pwd);
    console.log("encode:" + encode);
    pool.getConnection(function (err, connection) {
        connection.query($sql.login_judge, [uid, encode], function (err, result) {
            if (err) {
                res.render("error");
            }
            else {
                console.log(JSON.stringify(result));
                if (result) {
                    req.session.uid = result[0].Uid;
                    res.json({code: 200, Msg: "登录成功", nickname: result[0].Uid})
                }
                else {
                    res.json({code: 500, Msg: "账号或密码错误！"})
                }
            }
            connection.release();
        });
    })
}

function register(req, res) {
    var param = req.body;
    console.log(param);

    /*-------------string md5------------------*/
    var encode = pwdMd5.pwdMd5(param.password);
    console.log("string:" + encode);

    pool.getConnection(function (err, connection) {
        console.log('ok 1 ok 1 ok 1 ok 1 ok 1 ok 1 ok ok')

        // if(isReg.length>0){
        //     res.json({code:300,msg:'该邮箱已注册'})
        // }

        connection.query($sql.register_insert, [param.uid, encode], function (err, result) {
            console.log(result);
            connection.release();
            if (err) {
                res.json({code: 500, msg: err});
            }
            else if (result.affectedRows > 0) {
                req.session.uid = param.uid;
                res.json({code: 200, msg: "注册成功"})
            }
        });
    });
}
function isLogin(req, res) {
    if (req.session.uid) {
        //若已登录返回用户相关信息
        //todo:判断用户信息填写是否完善
        pool.getConnection(function (err, connection) {
            connection.query($sql.user, [req.session.uid], function (err, result) {
                connection.release();
                if (err) {
                    res.render("error");
                }
                else if (result) {
                    req.session.uid = result[0].Uid;
                    res.json({code: 200, nickname: result[0].Uid})
                }
                else {
                    res.json({code: 500})
                }

            });
        })
    } else {
        res.json({code: 500})
    }
}
function logout(req,res) {
    req.session.uid=null;
    res.redirect('/');
}
exports.getCards = getCards;
exports.card_inner = card_inner;
exports.addCard = addCard;
exports.login = login;
exports.register = register;
exports.isLogin = isLogin;
exports.logout = logout;