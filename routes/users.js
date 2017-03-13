var express = require('express');
var multipart = require('connect-multiparty');
var router = express.Router();
var userDao = require('./../dao/userDao');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('my');
});

module.exports = router;
