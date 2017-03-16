/**
 * Created by SWSD on 2017-03-06.
 */
var card = {
    register_insert: 'INSERT INTO `user`(Uid,Password) VALUES(?,?)',
    reg_search:'select * from `user` where Uid=?',
    login_judge: "select * from `user` where Uid=? and Password=?",
    user: "select * from `user` where Uid=?",
    sqltotal: 'select count(*) total from tourcard',
    sqllimit: 'select tourcard.Uid,face,Title,Price,Name from tourcard,`user` WHERE  tourcard.Uid=`user`.Uid ORDER BY Uptime desc LIMIT ?,?',
    sqlContent: 'select *,year(NOW())-year(Birthday) Age from tourcard,`user` where tourcard.Uid=? and tourcard.Uid=user.Uid ',
    getSetting: 'select *,date_format(Birthday,"%Y-%m-%d") Birthday from `user` where Uid=?',
    // sqlMsg: 'SELECT *,date_format(message.Time,"%h:%i %Y-%c-%d") Time  FROM `user`, message,tourcard WHERE message.Uid=`user`.Uid AND tourcard.Uid=? AND tourcard.Uid=message.Uid order by message.Time desc',
    // sqlReply: 'SELECT *,date_format(Time,"%h:%i %Y-%c-%d") Time FROM `reply` where Cid=? order by Time desc',
    addCard:'INSERT INTO tourcard(Uid,Title,About,Addr,Price,CanCut,Play,Other,AppointTime,AboutPrice,Face,Photos) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)',
    updateCard:'UPDATE tourcard SET Title=?,About=?,Addr=?,Price=?,CanCut=?,Play=?,Other=?,AppointTime=?,AboutPrice=?,Face=?,Photos=? WHERE Uid=?',
    updateUser:'UPDATE `user` SET `Name`=?,Gender=?,Birthday=?,IDCard=?,Job=?,Tellphone=?,Wechat=?,Anhao=?,Zhifubao=?,HeadPic=?,Intro=? WHERE Uid=?',
};
module.exports = card;