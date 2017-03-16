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

/*判断账户是否已注册=== begin========*/
function isReg(uid, callback) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.reg_search, [uid], function (err, isReg) {
            if (err) {
                console.log('reg_search>>>>', err);
                callback({code: 2, msg: '出错啦~'});
            } else if (isReg.length > 0) {
                callback({code: 1, msg: '该邮箱已注册'});
            } else {
                callback({code: 0, msg: '该邮箱未注册'});
            }
            connection.release();
        })
    })
};

/*判断账户是否已注册===end*/
function getCards(start, acount, res, callback) {

    pool.getConnection(function (err, connection) {
        connection.query($sql.sqltotal, function (err, total) {
            if (err) {
                console.log("total错误：" + err.message);
            }
            else {
                connection.query($sql.sqllimit, [start, acount], function (err, result) {
                    if (err) {
                        console.log("sqllimit错误：" + err.message);
                    }
                    else {
                        callback({totals: total[0], results: result});
                    }
                    connection.release();
                });
            }
        });
    })

}
function card_inner(req, res, uid, callback) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.sqlContent, [uid], function (err, content) {
            if (err) {
                console.log(err.message)
            }
            else {
                // connection.query($sql.sqlMsg, [tid], function (err, msg) {
                //     connection.query($sql.sqlReply, [tid], function (err, reply) {

                callback({
                    card: content[0],
                    // msg: msg,
                    // rep: reply,
                    // sessionId: req.session.userId
                });
                connection.release();
                //     })
                // })
            }

        });
    });
};
function updateCard(req, res, uid) {
    let facePic,photos;

    let body = req.body;
    let canCut = body.canCut ? "是" : "否";
    let other = body.other ? req.body.other : "";

    /*以下使用promise，使得face和photos依次上传完图片后插入数据库*/
    let getFace = function() {
        let promise = new Promise(function(resolve, reject){
            if(req.files.facePic.originalFilename==''){
                facePic=req.session.face;
                resolve(facePic);
            }else {
                uploadImg(req.files.facePic, function (data) {
                    if (data.code == 200) {
                        facePic = data.url;
                        resolve(facePic);
                    }
                    else {
                        reject({code: 500, msg: '封面文件上传出错！'});
                        // res.json({code: 500, msg: '封面文件上传出错！'})
                    }
                });
            }
        });
        return promise;
    };
    let getPhotos = function() {
        let promise = new Promise(function(resolve, reject){
            if(req.files.photos.originalFilename==''){
                photos=req.session.photos;
                resolve(photos);
            }else{
                uploadImgs(req.files.photos, function (datas) {
                    if (datas.code == 200) {
                        photos=datas.photos.join(',');
                        resolve(photos);
                    } else {
                        reject({code: 500, msg: '说明图片上传出错！'});
                    }
                });
            }
        });
        return promise;
    };
    getFace().then(function (facePic) {
        /*这里getFace 成功后再调用另一个promise*/
        getPhotos().then(function (photos) {
            console.log('>>>>>>>>>',facePic);
            console.log('>>>>>>>>>',photos);
            pool.getConnection(function (err, connection) {
                connection.query($sql.updateCard, [body.title, body.about, body.addr,
                    body.price, canCut, body.play, other, body.appointTime,
                    body.aboutPrice, facePic, photos,uid+''], function (err, result) {
                    if (err) {
                        console.log(err.message)
                    }
                    else if(result.changedRows==1) {
                        res.json({code: 200})
                    }
                    connection.release();
                });
            });
        }).catch(function (err) {
            res.json(err)
        })
    }).catch(function (err) {
        res.json(err)
    });

};


function addCard(req, res,uid) {
    uploadImg(req.files.facePic, function (data) {
        let body = req.body;

        if (data.code == 200) {

            let canCut = body.canCut ? "是" : "否";
            let other = body.other ? body.other : "";
            uploadImgs(req.files.photos, function (datas) {
                if (datas.code == 200) {
                    pool.getConnection(function (err, connection) {
                        connection.query($sql.addCard, [uid, body.title, body.about, body.addr,
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
}

function setting(req, res,uid) {
    let body = req.body;
    console.log(body);
    let headPic;
    if(req.session.HeadPic){
        headPic=req.session.HeadPic
    }else {
        uploadImg(req.files.headPic, function (data) {
            if (data.code == 200) {
                headPic=data.url;
                pool.getConnection(function (err, connection) {
                    connection.query($sql.updateUser, [body.name, body.gender, body.birthday, body.IDcard,
                        body.job, body.tel, body.wechat, body.anhao, body.zhifubao,
                        headPic,body.intro,uid], function (err, result) {
                        if (err) {
                            console.log(err.message)
                        }
                        else {
                            res.json({code: 200})
                        }
                        connection.release();
                    });
                });
            }
            else {
                res.json({code: 500})
            }
        });  
    }
   
}
function getSetting(req, res,uid) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.getSetting, [uid], function (err, result) {
            if (err) {
                console.log(err.message)
            }
            else {
                if(result[0].HeadPic){
                    req.session.HeadPic=result[0].HeadPic;
                    console.log('req.session.HeadPic>>>>>>',req.session.HeadPic)
                }
                res.render('my/setting',{
                    user:result[0]
                })
            }
            connection.release();
        });
    });
}

function login(req, res) {
    var uid = req.body.uid;
    var pwd = req.body.password;
    //直接对"123456"字符串加密
    var encode = pwdMd5.pwdMd5(pwd);
    // let isReg=isReg(uid)
    // console.log(isReg)

    isReg(uid, function (data) {
        if (data.code == 1) {
            pool.getConnection(function (err, connection) {
                connection.query($sql.login_judge, [uid, encode], function (err, result) {
                    if (err) {
                        res.render("error");
                    }
                    else {
                        console.log(JSON.stringify(result));
                        if (result.length > 0) {
                            req.session.uid = result[0].Uid;
                            console.log('login ok')
                            res.json({code: 200, msg: "登录成功", nickname: result[0].Uid})
                        }
                        else {
                            res.json({code: 500, msg: "账号或密码错误！"})
                        }
                    }
                    connection.release();

                });
            })
        } else {
            res.json(data)
        }

    })
}

function register(req, res) {
    var param = req.body;
    console.log(param);

    /*-------------string md5------------------*/
    var encode = pwdMd5.pwdMd5(param.password);
    isReg(param.uid, function (data) {
        if (data.code == 1) {
            res.json({code: 300, msg: data.msg})
        } else {
            pool.getConnection(function (err, connection) {
                connection.query($sql.register_insert, [param.uid, encode], function (err, result) {

                    if (err) {
                        console.log('register_insert>>>>>>>', err);
                        res.json({code: 500, msg: err});
                    }
                    else if (result.affectedRows > 0) {
                        req.session.uid = param.uid;
                        res.json({code: 200, msg: "注册成功,跳转至首页..."})
                    }
                    connection.release();
                });
            })
        }
    })
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
function logout(req, res) {
    req.session.uid = null;
    res.redirect('/');
}

function my(req,res,uid,callback) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.sqlContent,[uid],function (err,card) {
            if (err) {
                //todo:错误处理
                console.log(err.message)
            }else if(card.length>0){
                req.session.face=card[0].Face;
                req.session.photos=card[0].Photos;
                callback({card:card[0],haveCard:true})
            }else{
                callback({haveCard:false})
            }
        })
    });
}
exports.getCards = getCards;
exports.card_inner = card_inner;
exports.updateCard = updateCard;
exports.addCard = addCard;
exports.login = login;
exports.register = register;
exports.isLogin = isLogin;
exports.logout = logout;
exports.my = my;
exports.setting = setting;
exports.getSetting = getSetting;