var express = require('express');
var multipart = require('connect-multiparty');
var router = express.Router();
var userDao = require('./../dao/userDao');

/* GET users listing. */
router.get('/', function (req, res, next) {
    //  tid=uid;
    let uid = req.session.uid ? req.session.uid : 2;
   
    userDao.my(req,res,uid,function (data) {
        res.render('my',data)
    })
});
router.get('/getOrder', function (req, res, next) {
    //  tid=uid;
    let uid = req.session.uid ? req.session.uid : 2;
    userDao.getOrder(req,res,uid,function (data) {
        res.render('my',data)
    })
});

router.route('/setting').get(function (req,res) {
    let uid = req.session.uid ? req.session.uid : '2';
    userDao.getSetting(req,res,uid)
   
}).post(multipart(),function (req,res) {
    let uid = req.session.uid ? req.session.uid : '2';
    userDao.setting(req, res, uid)
});

router.post('/updateCard', multipart(), function (req, res, next) {
    //  tid=uid;
    let uid = req.session.uid ? req.session.uid : 2;
    userDao.updateCard(req, res, uid);

});
router.post('/addCard', multipart(), function (req, res, next) {
    let uid = req.session.uid ? req.session.uid : 2;
    userDao.addCard(req, res, uid)

});
router.post('/order', multipart(), function (req, res, next) {
    let uid = req.session.uid ? req.session.uid : 2;
    userDao.order(req, res, uid)

});

module.exports = router;
