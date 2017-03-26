/**
 * Created by SWSD on 2017-03-06.
 */
var card = {
    register_insert: 'INSERT INTO `user`(Uid,Password) VALUES(?,?)',
    reg_search:'select * from `user` where Uid=?',
    login_judge: "select * from `user` where Uid=? and Password=?",
    user: "select * from `user` where Uid=?",
    sqltotal: 'select count(*) total from tourcard',
    sqllimit: 'select tourcard.Uid,face,Title,Price,Name,Addr from tourcard,`user` WHERE  tourcard.Uid=`user`.Uid ORDER BY Uptime desc LIMIT ?,?',
    getDetail: 'select *,year(NOW())-year(Birthday) Age from tourcard,`user` where tourcard.Uid=? and tourcard.Uid=user.Uid ',
    isSave: 'SELECT COUNT(*) num from save WHERE Uid=? AND Tid=?',
    saveNum: 'SELECT COUNT(*) num from save WHERE Tid=?',
    orderNum: 'SELECT COUNT(*) num from `order` WHERE Tid=?',
    getSetting: 'select *,date_format(Birthday,"%Y-%m-%d") Birthday from `user` where Uid=?',
    // sqlMsg: 'SELECT *,date_format(message.Time,"%h:%i %Y-%c-%d") Time  FROM `user`, message,tourcard WHERE message.Uid=`user`.Uid AND tourcard.Uid=? AND tourcard.Uid=message.Uid order by message.Time desc',
    // sqlReply: 'SELECT *,date_format(Time,"%h:%i %Y-%c-%d") Time FROM `reply` where Cid=? order by Time desc',
    addCard:'INSERT INTO tourcard(Uid,Title,About,Addr,Price,CanCut,Play,Other,AppointTime,AboutPrice,Face,Photos) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)',
    updateCard:'UPDATE tourcard SET Title=?,About=?,Addr=?,Price=?,CanCut=?,Play=?,Other=?,AppointTime=?,AboutPrice=?,Face=?,Photos=? WHERE Uid=?',
    updateUser:'UPDATE `user` SET `Name`=?,Gender=?,Birthday=?,IDCard=?,Job=?,Tellphone=?,Wechat=?,Anhao=?,Zhifubao=?,HeadPic=?,Intro=? WHERE Uid=?',
    addOrder:'INSERT INTO `order`(Tid,Uid,State,Appointment,price) VALUES(?,?,?,?,?)',
    getOrder0:'SELECT date_format(OrderTime,"%Y-%c-%d %H:%i") OrderTime,State,Oid,`order`.Price Price,Tid,Addr,Anhao,Wechat,`Name`,tourcard.Uid Uid,Face,Title,Addr,Appointment FROM `order`,tourcard,`user` WHERE `order`.Tid=tourcard.Uid AND tourcard.Uid=`user`.Uid AND `order`.Uid=? AND State LIKE ? ORDER BY Oid DESC',
    getOrder1:'SELECT date_format(OrderTime,"%Y-%c-%d %H:%i") OrderTime,State,Oid,`order`.Price Price,Tid,Addr,Anhao,Wechat,`Name`,HeadPic,`user`.Uid,Appointment FROM `order`,`user`,tourcard WHERE `order`.Uid=`user`.Uid AND tourcard.Uid=`order`.Tid AND `order`.Tid=? AND State LIKE ? ORDER BY Oid DESC',
    changeState:'UPDATE `order` SET State=?,Appointment=?,Price=? WHERE Oid=?',
    deleteOrder:'DELETE FROM `order` WHERE Oid=?',
    addsave:'INSERT INTO `save`(Uid,Tid) VALUES(?,?)',
    delsave:'DELETE FROM `save` WHERE Uid=? AND Tid=?',
    completeInfo:'SELECT `Name` from `user` WHERE Uid=?',
    addNews:'INSERT INTO news(Nid,Uid,Tid,Type) VALUES(?,?,?,?)',
    getNewsListO:'SELECT *,date_format(Ntime,"%Y-%c-%d %H:%i") Ntime FROM news WHERE Tid=? AND Flag=0 AND Type=2  ORDER BY Ntime DESC',
    getNewsListM:'SELECT *,date_format(Ntime,"%Y-%c-%d %H:%i") Ntime FROM news WHERE Tid=? AND Flag=0 AND Type=0  ORDER BY Ntime DESC',
    getNewsListR:'SELECT *,date_format(Ntime,"%Y-%c-%d %H:%i") Ntime FROM news WHERE Uid=? AND Flag=0 AND Type=1  ORDER BY Ntime DESC',
    saveContent:'SELECT *,date_format(Uptime,"%Y-%c-%d %H:%i") Uptime FROM save,tourcard,`user` WHERE save.Tid=tourcard.Uid AND `user`.Uid=tourcard.Uid AND save.Uid=?',
    getNewsOrder1:'SELECT *,date_format(OrderTime,"%Y-%c-%d %H:%i") OrderTime FROM `order`,`user` WHERE `order`.Oid=? AND `user`.Uid=`order`.Tid',//租我的消息
    getNewsOrder2:'SELECT *,date_format(OrderTime,"%Y-%c-%d %H:%i") OrderTime FROM `order`,news WHERE Nid=Oid AND `order`.Uid=?',//订单确认信息
    getNewsMsg:'SELECT *,date_format(message.Mtime,"%Y-%c-%d %H:%i") Mtime FROM message,tourcard,`user` WHERE tourcard.Uid=message.Tid AND `user`.Uid=message.Uid AND message.Mid=?',
    getNewsRep:'SELECT *,date_format(reply.Rtime,"%Y-%c-%d %H:%i") Rtime FROM reply,`user`,message WHERE reply.Mid=message.Mid and reply.Rid=? AND reply.Uid=`user`.Uid',
    setFlag:'UPDATE news SET Flag=1 WHERE Nid=?',//标记信息已读状态
    addCommen:'INSERT INTO message(Uid,Tid,Text) VALUES(?,?,?)',//新增评论
    addReply:'INSERT INTO reply(Uid,Mid,Reply) VALUES(?,?,?)',//新增评论
    getCommen:'SELECT *,date_format(message.Mtime,"%Y-%c-%d %H:%i") Time FROM message,`user` WHERE Mid=? AND `user`.Uid=message.Uid',//新增评论
    getReply:'SELECT *,date_format(reply.Rtime,"%Y-%c-%d %H:%i") Time FROM reply,`user` WHERE `user`.Uid=reply.Uid AND reply.Rid=?',//新增评论
    getCommens:'SELECT *,date_format(message.Mtime,"%Y-%c-%d %H:%i") Time FROM message,`user`,tourcard WHERE `user`.Uid=message.Uid AND tourcard.Uid=message.Tid AND tourcard.Uid=? ORDER BY Mid DESC',//查找所有评论
    getReplies:'SELECT *,date_format(reply.Rtime,"%Y-%c-%d %H:%i") Time FROM reply,tourcard,`user`,message WHERE tourcard.Uid=? AND tourcard.Uid=message.Tid AND message.Mid=reply.Mid and message.Uid=`user`.Uid',//查找所有留言
};
module.exports = card;