var express = require('express');
var multipart = require('connect-multiparty');
var router = express.Router();
var userDao = require('./../dao/userDao');


/* GET home page. */
router.get('/', function (req, res, next) {
    req.url='/';
    userDao.getCards(0, 6,'%', res, function (result) {
        res.render('index', {face: result.results,articles:result.articles})
    });
});

router.post('/login', function (req, res, next) {
    userDao.login(req, res)
});
router.post('/forget', function (req, res, next) {
    userDao.forget(req, res)
});
router.post('/reset', function (req, res, next) {
    userDao.reset(req, res)
});
router.post('/register', function (req, res, next) {
    userDao.register(req, res)
});
//标记用户是否登录
router.get('/session', function (req, res, next) {
    userDao.isLogin(req, res, next);
});
router.get('/logout', function (req, res, next) {
    userDao.logout(req, res)
});
router.get('/isLogin',function (req,res) {
    if(req.session.uid){
        res.json({code:200})
    }else{
        res.json({code:500})
    }
});
/*Ta的主页*/
router.get('/ta',function (req,res) {
    userDao.ta(req,res)
});

router.get ('articles',function (req,res) {
    userDao.article(req,res)
})

module.exports = router;
