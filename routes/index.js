var express = require('express');
var multipart = require('connect-multiparty');
var router = express.Router();
var userDao = require('./../dao/userDao');


/* GET home page. */
router.get('/', function (req, res, next) {

    userDao.getCards(0, 6, res, function (result) {
        res.render('index', {face: result.results})
    });
    // res.render('index', {title: '旅人'});
});
router.route('/addCard')
    .get( function (req, res, next) {
        res.render('addCard', {title: '添加旅人卡'});
    })
    .post(multipart(), function (req, res, next) {

        userDao.addCard(req, res)

    });


module.exports = router;
