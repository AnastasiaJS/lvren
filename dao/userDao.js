/**
 * Created by SWSD on 2017-03-06.
 */
var $conf = require("./../conf/db");
var $sql = require('./userSqlMapping');
var mysql = require('mysql');
// var query = require('./../util/DBHelper');
//创建连接池
var pool = mysql.createPool($conf);

function getCards(start, acount, res, callback) {

    console.log("===================getface")
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
                        console.log('>>>>>>>>>',content)
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
}
exports.getCards = getCards;
exports.card_inner = card_inner;