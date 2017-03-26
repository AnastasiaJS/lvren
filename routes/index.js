var express = require('express');
var multipart = require('connect-multiparty');
var router = express.Router();
var userDao = require('./../dao/userDao');


/* GET home page. */
router.get('/', function (req, res, next) {
    req.url='/'
    userDao.getCards(0, 6, res, function (result) {
        res.render('index', {face: result.results})
    });
});

router.post('/login', function (req, res, next) {
    userDao.login(req, res)
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
})

module.exports = router;
