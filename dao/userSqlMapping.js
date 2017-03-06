/**
 * Created by SWSD on 2017-03-06.
 */
var card = {
    sqltotal: 'select count(*) total from tourcard',
    sqllimit: 'select Tid,face1,Title,Price,tourcard.Addr,Nickname from facepic,tourcard,' +
    '`user` WHERE facepic.id=tourcard.Tid AND tourcard.Uid=`user`.Uid ORDER BY Uptime desc LIMIT ?,?',
    sqlContent: 'select *,year(NOW())-year(Birthday) Age from tourcard,photo,facepic,user where tourcard.Tid=? and tourcard.Tid=facepic.id and tourcard.Uid=user.Uid and tourcard.Tid=photo.id',
    sqlMsg: 'SELECT *,date_format(message.Time,"%h:%i %Y-%c-%d") Time  FROM `user`, message,tourcard WHERE message.Uid=`user`.Uid AND tourcard.Tid=? AND tourcard.Tid=message.Tid order by message.Time desc',
    sqlReply: 'SELECT *,date_format(Time,"%h:%i %Y-%c-%d") Time FROM `reply` where Cid=? order by Time desc'
};
module.exports = card;