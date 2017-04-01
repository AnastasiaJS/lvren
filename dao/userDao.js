/**
 * Created by SWSD on 2017-03-06.
 */
var $conf = require("./../conf/db");
var $sql = require('./userSqlMapping');
var fileuuid = require('./../util/uuidHelper');
var pwdMd5 = require('./../util/md5Helper');
var mailer = require('./../util/mail');
//实际使用中可以在应用启动时进行初始化(只需执行一次)
require('mysql-queries').init($conf);
//执行多条SQLs
var mq = require('mysql-queries');

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
            newData = Object.assign({}, {code: data.code, err: data.err});
        });
    });
    setTimeout(function () {
        callback(Object.assign({}, {code: newData.code, photos}));
    }, 5000);


}

/*七牛云相关服务的应用 =====end*/

/*生成随机验证码*/
function createCode(){
    let code = "";
    var codeLength = 6;//验证码的长度  
    var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');//随机数  
    for(var i = 0; i < codeLength; i++) {//循环操作  
        var index = Math.floor(Math.random()*36);//取得随机数的索引（0~35）  
        code += random[index];//根据索引取得随机数加到code上  
    }
    return code;//把code值赋给验证码  
}
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


function getCards(start, acount,sort, res, callback) {
    pool.getConnection(function (err, connection) {
        if(err){
            console.log('getCards',err);
            res.render('error')
        }
        else{
            connection.query($sql.sqltotal,[sort], function (err, total) {
                if (err) {
                    console.log("total错误：" + err.message);
                }
                else {
                    connection.query($sql.sqllimit, [sort,start, acount], function (err, result) {
                        if (err) {
                            console.log("sqllimit错误：" + err.message);
                        }
                        else {
                            connection.query($sql.getarticles, [sort,start, acount], function (err, articles) {
                                if (err) {
                                    console.log("getarticles：" + err);
                                }
                                else {
                                    callback({totals: total[0], results: result,sort,articles:articles});
                                }
                                connection.release();
                            })

                        }
                    });
                }
            });
        }
    })

}
function card_inner(req, res, tid, callback) {
    let save=false;
    req.session.url='/card?card='+tid;
    /*执行多条语句==============*/
    var sqls = [$sql.getDetail, 
        $sql.saveNum,
        $sql.isSave,
        $sql.orderNum,
        $sql.getCommens,
        $sql.getReplies
    ];
    mq.queries(sqls,
        [[tid],[tid],[req.session.uid, tid],[tid],[tid],[tid]], function(err, results){
            if(err) {
                console.log(err);
            } else {
                //"results"为数组,其为多条SQL的执行结果.
                if(results[2][0].num>0){
                    save=true;
                }
                callback({
                    card: results[0][0],
                    savenum: results[1][0].num,
                    save: save,
                    ordernum: results[3][0].num,
                    url:req.session.url,
                    msgs:  results[4],
                    reps: results[5],
                });
            }
        });
};
function addSave(req, res, uid) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.addsave, [uid, req.query.tid], function (err, result) {
            if (err) {
                console.log('addSave>>>>>>>>>', err.message)
            }
            else if (result.affectedRows > 0) {
                connection.query($sql.saveNum,[req.query.tid],function (err,saveNum) {
                    res.json({code: 200,savenum:saveNum[0].num})
                });
               
            } else {
                res.json({code: 500})
            }
            connection.release();
        });
    });
};
function cancelSave(req, res, uid) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.delsave, [uid, req.query.tid], function (err, result) {
            if (err) {
                console.log('cancelSave>>>>>>>>>', err.message)
            }
            else if (result.affectedRows > 0) {
                connection.query($sql.saveNum,[req.query.tid],function (err,saveNum) {
                    res.json({code: 200,savenum:saveNum[0].num})
                });
            } else {
                res.json({code: 500})
            }
            connection.release();
        });
    });
};
function comment(req, res) {
    let sqls=[$sql.addCommen,$sql.getCommen,$sql.addNews];

    mq.queries(sqls,[
            [req.session.uid, req.body.tid, req.body.text],
            [''],
            ['',req.session.uid,req.body.tid,0]],
        {
            skip:function(i, arg, results) {//skip判断是否忽略当前SQL的执行,返回true忽略,false不忽略
                /*arg为当前sql的参数*/
                let skip=false;
                // console.log('results[0]',results[0]);
                switch (i){
                    case 1:{
                        skip=results[0].affectedRows?false:true;
                        if(results[0].affectedRows){/*如果第一条sql被执行，第一条的结果id作为第二条的参数*/
                            arg[0]=results[0].insertId;
                        }
                        break;
                    }
                    case 2:{
                        skip=results[0].affectedRows?false:true;
                        if(results[0].affectedRows){/*如果第一条sql被执行，第一条的结果id作为第二条的参数*/
                            arg[0]='M'.concat(results[0].insertId);
                        }
                        break;
                    }
                }
                return skip;
            }
        }, function(err, results){
            if (err) {
                console.log('addCommen>>>>>>>', err);
                res.json({code: 500, msg: err});
            }
            else if (results[0].affectedRows > 0) {
                res.json({
                    code: 200,
                    newMsg:results[1][0]
                })
            }
        });
};
function reply(req, res) {
    let sqls=[$sql.addReply,$sql.getReply,$sql.addNews];

    mq.queries(sqls,[
            [req.session.uid, req.body.mid, req.body.reply],
            [''],
            ['',req.session.uid,req.body.tid,1]],
        {
            skip:function(i, arg, results) {//skip判断是否忽略当前SQL的执行,返回true忽略,false不忽略
                /*arg为当前sql的参数*/
                let skip=false;
                console.log(results)
                switch (i){
                    case 1:{
                        skip=results[0].affectedRows?false:true;
                        if(results[0].affectedRows){/*如果第一条sql被执行，第一条的结果id作为第二条的参数*/
                            arg[0]=results[0].insertId;
                        }
                        break;
                    }
                    case 2:{
                        skip=results[0].affectedRows?false:true;
                        if(results[0].affectedRows){/*如果第一条sql被执行，第一条的结果id作为第二条的参数*/
                            arg[0]='R'.concat(results[0].insertId);
                        }
                        break;
                    }
                }
                return skip;
            }
        }, function(err, results){
            if (err) {
                console.log('addReply>>>>>>>', err);
                res.json({code: 500, msg: err});
            }
            else if (results[0].affectedRows > 0) {
                res.json({
                    code: 200,
                    newRep:results[1][0]
                })
            }
        });
};
function updateCard(req, res, uid) {
    let facePic, photos;

    let body = req.body;
    let canCut = body.canCut ? "是" : "否";
    let other = body.other ? req.body.other : "";

    /*以下使用promise，使得face和photos依次上传完图片后插入数据库*/
    let getPhotos = new Promise(function (resolve, reject) {
        if (req.files.photos.originalFilename == '') {
            photos = req.session.photos;
            resolve();
        } else {
            uploadImgs(req.files.photos, function (datas) {
                if (datas.code == 200) {
                    photos = datas.photos.join(',');
                    resolve();
                } else {
                    reject({code: 500, msg: '说明图片上传出错！'})
                }
            });
        }
    });
    let getFace = new Promise(function (resolve, reject) {
        if (req.files.facePic.originalFilename == '') {
            facePic = req.session.face;
            resolve(getPhotos);
        } else {
            uploadImg(req.files.facePic, function (data) {
                if (data.code == 200) {
                    facePic = data.url;
                    resolve(getPhotos);
                }
                else {
                    reject({code: 500, msg: '封面文件上传出错！'})
                }
            });
        }
    });
    getFace.then(function () {
        // console.log('>>>>>>>>>', facePic);
        // console.log('>>>>>>>>>', photos);
        pool.getConnection(function (err, connection) {
            connection.query($sql.updateCard, [body.title, body.about, body.addr,
                body.price, canCut, body.play, other, body.appointTime,
                body.aboutPrice, facePic, photos,body.sort, uid + ''], function (err, result) {
                if (err) {
                    console.log(err.message)
                }
                else if (result.affectedRows == 1) {
                    res.json({code: 200})
                }else{
                    res.json({code: 500})
                }
                connection.release();
            });
        });
        /*这里getFace 成功后再调用另一个promise*/
        // getPhotos.then(function (photos) {
        //
        // }).catch(function (err) {
        //     res.json(err)
        // })
    }).catch(function (err) {
        res.json(err)
    });

};


function addCard(req, res, uid) {
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
                            body.aboutPrice, data.url, datas.photos.join(','),body.sort], function (err, result) {
                            connection.release();
                            if (err) {
                                console.log(err.message)
                            }
                            else {
                                res.json({code: 200,url:'/card?card='+uid})
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

function setting(req, res, uid) {
    let body = req.body;
    console.log(body);
    let headPic;

    let promise = new Promise((resolve, reject)=> {
        let size=req.files.headPic.size;
        if (size) {
            uploadImg(req.files.headPic, function (data) {
                if (data.code == 200) {
                    headPic = data.url;
                    resolve(headPic)
                }
                else {
                    reject();
                }
            });
        } else {
            headPic = req.session.HeadPic;
            resolve(headPic);
        }
    });
    promise.then((headPic)=> {
        pool.getConnection(function (err, connection) {
            connection.query($sql.updateUser, [body.name, body.gender, body.birthday, body.IDcard,
                body.job, body.tel, body.wechat, body.anhao, body.zhifubao,
                headPic, body.intro, uid], function (err, result) {
                if (err) {
                    console.log(err.message)
                    res.render('error')
                }
                else {
                    res.json({code: 200})
                }
                connection.release();
            });
        });
    }).catch(()=> {
        res.json({code: 500})
    })


}
function getSetting(req, res, uid) {
    // let sql=[$sql.getSetting];
    // mq.queries(sql,[uid], function (err, result) {
    //     if (err) {
    //         console.log(err.message);
    //         // res.render('error');
    //     }
    //     else {
    //         if (result[0].HeadPic) {
    //             req.session.HeadPic = result[0].HeadPic;
    //             // console.log('req.session.HeadPic>>>>>>', req.session.HeadPic)
    //         }
    //         res.render('setting', {
    //             user: result[0]
    //         })
    //     }
    //     // connection.release();
    // });
    pool.getConnection(function (err, connection) {
        if(err){
            console.log('............',err);
            res.render('error');
        }else{
            connection.query($sql.getSetting, [uid], function (err, result) {
                if (err) {
                    console.log('/////////',err);
                    res.render('error');
                }
                else {
                    if (result[0].HeadPic) {
                        req.session.HeadPic = result[0].HeadPic;
                        console.log('req.session.HeadPic>>>>>>', req.session.HeadPic)
                    }
                    res.render('setting', {
                        user: result[0]
                    })
                }
                connection.release();
            });
        }

    });
}

function login(req, res) {
    var uid = req.body.uid;
    var pwd = req.body.password;
    //直接对"123456"字符串加密
    var encode = pwdMd5.pwdMd5(pwd);

    isReg(uid, function (data) {
        if (data.code == 1) {
            pool.getConnection(function (err, connection) {
                connection.query($sql.login_judge, [uid, encode], function (err, result) {
                    if (err) {
                        res.render("error");
                    }
                    else {
                        // console.log(JSON.stringify(result));
                        if (result.length > 0) {
                            req.session.uid = result[0].Uid;
                            // console.log('login ok');
                            res.json({
                                code: 200,
                                msg: "登录成功",
                                nickname: result[0].Uid,
                                url:req.session.url
                            })
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

/*发送邮件，验证码*/
function forget(req, res) {
    var uid = req.body.uid;

    isReg(uid, function (data) {
        if(data.code==0){//邮箱尚未注册
            res.json({code:300})
        }
        else if (data.code == 1) {
            req.session.code=createCode();
            req.session.mail=uid;
            console.log('req.session.code>>>>',req.session.code)
            mailer.mail(uid,req.session.code,function (data) {
                if(data.state){
                    res.json({
                        code:200
                    })
                }else{
                    res.json({code:500})
                }
            });

        } else {
            res.json({code:500})
        }

    })
}
function reset(req,res) {
    console.log('req.body.code>>>',req.body.code)
    if(req.body.code!=req.session.code){
        res.json({code:300,msg:'验证码错误'})
    }else{
        let psw=pwdMd5.pwdMd5(req.body.psw);
        pool.getConnection(function (err,connection) {
            connection.query($sql.resetPwd,[psw,req.session.mail],function (err,result) {
                if (err) {
                    console.log("resetPwd>>>>",err)
                    res.json({code: 500})
                }else{
                    if(result.affectedRows==1){
                        req.session.uid=req.session.mail;
                        req.session.mail=null;
                        res.json({code:200})
                    }else{
                        res.json({code:500})
                    }
                }
                connection.release()
            })
        })
    }
        
}
function getcode(req,res) {
    req.session.code=createCode();
    mailer.mail(req.body.uid,req.session.code,function (data) {
        if(data.state){
            res.json({code:200})
        }else{
            res.json({code:500})
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
            res.json({code: 300, msg: data.msg});
            return false;
        } else {
            if(req.body.code!=req.session.code){
                res.json({code:300,msg:'验证码错误'})
            }
            pool.getConnection(function (err, connection) {
                connection.query($sql.register_insert, [param.uid, encode], function (err, result) {

                    if (err) {
                        console.log('register_insert>>>>>>>', err);
                        res.json({code: 500, msg: err});
                    }
                    else if (result.affectedRows > 0) {
                        req.session.uid = param.uid;
                        res.json({code: 200, msg: "注册成功,去填写信息..."})
                    }
                    connection.release();
                });
            })
        }
    })
}
function isLogin(req, res) {
    let sqls=[$sql.user,$sql.getNewsNum1,$sql.getNewsNum2,$sql.getNewsNum3];
    mq.queries(sqls,[
        [req.session.uid],
        [req.session.uid],
        [req.session.uid],
        [req.session.uid],
    ],function (err,results) {
        console.log(results)
        if (err) {
            res.render("error");
        }
        else if (results[0].length) {
            console.log(results[0]);
            req.session.uid = results[0][0].Uid;
            res.json({code: 200,user:results[0][0],newsNum:results[1][0].num+results[2][0].num+results[3][0].num})
        }
        else {
            res.json({code: 500})
        }
    });
        // if (req.session.uid) {
        //     //若已登录返回用户相关信息
        //     //done:判断用户信息填写是否完善
        //     pool.getConnection(function (err, connection) {
        //         connection.query(, [req.session.uid], function (err, result) {
        //             if (err) {
        //                 res.render("error");
        //             }
        //             else if (result) {
        //                 req.session.uid = result[0].Uid;
        //                 res.json({code: 200,user:result[0], nickname: result[0].Uid})
        //             }
        //             else {
        //                 res.json({code: 500})
        //             }
        //             connection.release();
        //         });
        //     })
        // } else {
        //     res.json({code: 500})
        // }
}
function logout(req, res) {
    req.session.uid = null;
    req.session.url=null;
    res.redirect('/');
}
function my(req, res, uid, callback) {

    let sqls=[$sql.getOrder0,$sql.getDetail,$sql.getSetting,$sql.saveContent,$sql.getNewsListO,$sql.getNewsListM,$sql.getNewsListR]
        ,haveCard=false;

    pool.getConnection(function (err, connection) {
        connection.query($sql.completeInfo,[uid],function (err,info) {
            if(!info[0].Name){
                res.redirect('/users/setting');
                connection.release();
                return false;
            }else{
                connection.release();
                mq.queries(sqls,[[uid, '%'], [uid],[uid],[uid],[uid],[uid],[uid]],function (err,results) {
                    if (err) {
                        //todo:错误处理
                        console.log('getOrder>>>>>>', err.message);
                        res.render('error');
                        return false;
                    } else {
                        if(results[1].length>0){
                            req.session.face = results[1][0].Face;
                            req.session.photos = results[1][0].Photos;
                            haveCard=true;
                        }else{
                            haveCard=false;
                        }
                        callback({
                            card: results[1][0],
                            haveCard: haveCard,
                            order0: results[0],
                            user:results[2][0],
                            save:results[3],
                            newsO:results[4],
                            newsM:results[5],
                            newsR:results[6],
                        })
                    }
                })
            }
        });
    });

}
function ta(req, res) {

    let sqls=[$sql.getOrder0,$sql.getSetting,$sql.saveContent];
    let tid=req.query.tid;
    
    mq.queries(sqls,[[tid,'%'],[tid],[tid]],function (err,results) {
        if (err) {
            //todo:错误处理
            console.log('ta>>>>>>', err.message);
            res.json({code:500})
        } else {
            console.log("results[0]>>",results[0])
            res.render('Ta',{
                code:200,
                order0:results[0],
                user:results[1][0],
                save:results[2],
            })
        }
    })
}
function getOrder(req, res, uid) {
    let type = req.query.otype, sql = $sql.getOrder0;
    if (req.query.order == 1) {
        sql = $sql.getOrder1;
    }
    if (req.query.otype == -1) {
        type = '%'
    }
    pool.getConnection(function (err, connection) {
        connection.query(sql, [uid, type], function (err, result) {
            if (err) {
                console.log('getOrder>>>>>>>', err);
                res.json({code: 500, msg: err});
            }
            else {
                console.log('result[0]>>>>', result)
                res.json({code: 200, order: result})
            }
            connection.release();
        })
    })
}
function order(req, res, uid) {
    let sqls=[$sql.addOrder,$sql.addNews];

    mq.queries(sqls,[
        [req.body.tid, uid, 0, req.body.appointment, req.body.price],
        ['',uid,req.body.tid,2]],
        {
            skip:function(i, arg, results) {//skip判断是否忽略当前SQL的执行,返回true忽略,false不忽略
                /*arg为当前sql的参数*/
                let skip=false;
                switch (i){
                    case 1:{
                        skip=results[0].affectedRows?false:true;
                        if(results[0].affectedRows){/*如果第一条sql被执行，第一条的结果id作为第二条的参数*/
                            arg[0]='O'.concat(results[0].insertId);
                        }
                        break;
                    }
                    case 2:{

                    }
                }
                return skip;
            }
        }, function(err, results){
            if (err) {
                console.log('addOrder>>>>>>>', err);
                res.json({code: 500, msg: err});
            }
            else if (results[0].affectedRows > 0) {
                res.json({code: 200})
            }
        });
}
function pingjia(req,res,uid) {
    let sqls=[$sql.addPingjia,$sql.changeState2];

    mq.queries(sqls,[
            [req.body.oid,req.body.pingjia],
            [3,req.body.oid]],
        {
            skip:function(i, arg, results) {//skip判断是否忽略当前SQL的执行,返回true忽略,false不忽略
                /*arg为当前sql的参数*/
                let skip=false;
                switch (i){
                    case 1:{
                        skip=results[0].affectedRows?false:true;
                        break;
                    }
                }
                return skip;
            }
        }, function(err, results){
            if (err) {
                console.log('addPingjia>>>>>>>', err);
                res.json({code: 500, msg: err});
            }
            else if (results[0].affectedRows > 0 && results[1].affectedRows>0) {
                res.json({code: 200})
            }
        });
}
function getpingjia(req,res,uid) {
    let sqls=[$sql.getPingjia];
    mq.queries(sqls,[
            [req.query.oid]],
        {
            skip:function(i, arg, results) {//skip判断是否忽略当前SQL的执行,返回true忽略,false不忽略
                /*arg为当前sql的参数*/
                let skip=false;
                // switch (i){
                //     case 1:{
                //         skip=results[0].affectedRows?false:true;
                //         break;
                //     }
                // }
                return skip;
            }
        }, function(err, results){
            if (err) {
                console.log('getpingjia>>>>>>>', err);
                res.json({code: 500, msg: err});
            }
            else {
                res.json({code: 200,pingjia:results[0]})
            }
        });
}
function changeState(req, res) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.changeState, [req.query.state, req.query.appointment, req.query.price, req.query.oid], function (err, result) {
            if (err) {
                console.log('changeState>>>>>>>', err);
                res.json({code: 500, msg: err});
            }
            else if (result.affectedRows > 0) {
                res.json({code: 200})
            }
            connection.release();
        })
    })
}
function delOrder(req, res,uid) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.deleteOrder, [req.query.oid], function (err, result) {
            if (err) {
                console.log('delOrder>>>>>>>', err);
                res.json({code: 500, msg: err});
            }
            else if (result.affectedRows > 0) {
                res.json({code: 200})
            }
            connection.release();
        })
    })
}
function newsDetail(req, res) {
    let sql,id,type;
    switch (req.query.type){
        case '0':
            id=req.query.nid.split('M')[1];
            type=0;
            sql=$sql.getNewsMsg;
            break;
        case '1':
            id=req.query.nid.split('R')[1];
            type=1;
            sql=$sql.getNewsRep;
            break;
        case '2':
            sql=$sql.getNewsOrder1;
            id=req.query.nid.split('O')[1];
            type=2;
            break;
    }
    let sqls=[sql,$sql.setFlag];
    mq.queries(sqls,[[id],[req.query.nid]],{
        skip:function(i, arg, results) {//skip判断是否忽略当前SQL的执行,返回true忽略,false不忽略
            /*arg为当前sql的参数*/
            let skip=false;
          
            return skip;
        }
    }, function(err, results){
        if (err) {
            console.log('newsDetail>>>>>>>', err);
            res.json({code: 500, msg: err});
        }
        else {
            res.render('newsDetail',{
                code: 200,
                news:results[0],
                type:type  //0留言、1回复、2谁在租我、3订单确认
            })
        }
    });
}
function article(req,res) {
    pool.getConnection(function (err, connection) {
        connection.query($sql.getarticles, function (err, result) {
            if (err) {
                res.render("error");
            }
            else {
                res.render('article',{articles:result})
            }
            connection.release();
        });
    })
}
exports.getCards = getCards;
/*more card分页*/
exports.card_inner = card_inner;
/*获取card详情*/
exports.addSave = addSave;
/*收藏*/
exports.cancelSave = cancelSave;
/*取消收藏*/
exports.comment = comment;
/*留言*/
exports.reply = reply;
/*回复留言*/
exports.updateCard = updateCard;
/*用户更新card*/
exports.addCard = addCard;
/*用户发布card*/
exports.login = login;
/*用户登录*/
exports.forget = forget;
/*忘记密码*/
exports.reset = reset;
/*重新设置密码*/
exports.register = register;
/*用户注册*/
exports.getcode = getcode;
/*获得验证码*/
exports.isLogin = isLogin;
/*判断用户是否登录*/
exports.logout = logout;
/*退出登录*/
exports.my = my;
/*获取我的个人主页*/
exports.ta = ta;
/*获取ta的个人主页*/
exports.setting = setting;
/*修改个人设置*/
exports.getSetting = getSetting;
/*获取个人设置信息*/
exports.order = order;
/*用户下单*/
exports.getOrder = getOrder;
/*订单查询*/
exports.pingjia = pingjia;
/*评价*/
exports.getpingjia = getpingjia;
/*评价*/
exports.changeState = changeState;
/*改变订单状态*/
exports.delOrder = delOrder;
/*删除订单*/
exports.newsDetail = newsDetail;
/*获取消息详情*/
exports.article = article;
/*获取消息详情*/