var express = require('express');
var router = express.Router();
var multipart = require('connect-multiparty');
var userDao = require('./../dao/userDao');

/* GET users listing. */
router.get('/', function (req, res, next) {
    let tid=req.query.card;
    userDao.card_inner(req,res,tid,function (data) {
        res.render('cardDetail',data)
    });
});
router.get('/more', function (req, res, next) {
    let index = 1;
    let account = 9;//没一页的显示数量
    let pages = 1;//初始化页数=1
    if (req.query.index) {
        index = req.query.index;
    }
    let sort=req.query.sort?req.query.sort:'%'
    var start = (index - 1) * account;
    userDao.getCards(start, account,sort, res, function (result) {
        pages = Math.ceil(result.totals.total / account);
        res.render('moreCards',{pageAccount:pages,face:result.results,sort:result.sort})
    });
});
/*收藏*/
router.get('/save',function (req,res) {
    if(req.session.uid){
        userDao.addSave(req,res,req.session.uid)
    }else{
        res.json({code:300});//未登录
    }

});
/*取消收藏*/
router.get('/cancelsave',function (req,res) {
    if(req.session.uid){
        userDao.cancelSave(req,res,req.session.uid)
    }else {
        res.json({code:300});//未登录
    }
})
router.post('/comment',multipart(),function (req,res) {
    if(req.session.uid){
        userDao.comment(req,res)
    }else{
        res.json({code:300});//未登录
    }
})
router.post('/reply',multipart(),function (req,res) {
    if(req.session.uid){
        userDao.reply(req,res)
    }else{
        res.json({code:300});//未登录
    }
})
module.exports = router;
