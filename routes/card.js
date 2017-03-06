var express = require('express');
var router = express.Router();
var userDao = require('./../dao/userDao');

/* GET users listing. */
router.get('/', function (req, res, next) {
    let tid=req.query.card;
    userDao.card_inner(req,res,tid);
});
router.get('/more', function (req, res, next) {
    var index = 1;
    var account = 9;//没一页的显示数量
    var pages = 1;//初始化页数=1
    
    if (req.query.index) {
        index = req.query.index;
    }
    var start = (index - 1) * account;
    userDao.getCards(start, account, res, function (result) {
        pages = Math.ceil(result.totals.total / account);
        console.log('result.results>>>>>>>>>>',result.results);
        res.render('moreCards',{pageAccount:pages,face:result.results})
    });
});

module.exports = router;
