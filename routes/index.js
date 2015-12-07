var express = require('express');
var http_proxy = require('../fwang_modules/http_proxy');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.sendFile("public/index.html")
});

module.exports = router;
