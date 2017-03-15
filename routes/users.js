var express = require('express');
var multipart = require('connect-multiparty');
var router = express.Router();
var userDao = require('./../dao/userDao');

/* GET users listing. */
router.get('/', function(req, res, next) {
  //  tid=uid;
    let uid=req.session.uid?req.session.uid:2;
  userDao.card_inner(req,res,uid,function (data) {
      res.render('my',data);
  });
  
});

module.exports = router;
