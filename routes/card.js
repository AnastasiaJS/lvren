var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('cardDetail');
});
router.get('/more', function(req, res, next) {
  res.render('moreCards');
});

module.exports = router;
