/**
 * Created by SWSD on 2017-03-06.
 */
var card = {
    sqltotal: 'select count(*) total from tourcard',
    sqllimit: 'select Tid,face,Title,Price,Nickname from tourcard,`user` WHERE  tourcard.Uid=`user`.Uid ORDER BY Uptime desc LIMIT ?,?',
    sqlContent: 'select *,year(NOW())-year(Birthday) Age from tourcard,`user` where tourcard.Tid=? and tourcard.Uid=user.Uid ',
    sqlMsg: 'SELECT *,date_format(message.Time,"%h:%i %Y-%c-%d") Time  FROM `user`, message,tourcard WHERE message.Uid=`user`.Uid AND tourcard.Tid=? AND tourcard.Tid=message.Tid order by message.Time desc',
    sqlReply: 'SELECT *,date_format(Time,"%h:%i %Y-%c-%d") Time FROM `reply` where Cid=? order by Time desc',
    addCard:'INSERT INTO tourcard(Uid,Title,About,Price,CanCut,Play,Other,AppointTime,AboutPrice,Face,Photos) VALUES(?,?,?,?,?,?,?,?,?,?,?)'
};
module.exports = card;