var dbconfig=require('./../conf/db');
var mysql=require('mysql');
function getConnection(sql,arr,callback) {
    var connect_pool=mysql.createPool(dbconfig.exports);
    connect_pool.connectionLimit=20;
    connect_pool.queueLimit=10;
    connect_pool.getConnection(function (error,connection) {
        if(error){
            console.log(error.message);
        }
        else{
            connection.query(sql,arr,function (err,result,fields) {
                connection.release();
                callback(err,result,fields);
            })
        }

    });
}
module.exports=getConnection;
// exports.getConnection=getConnection;