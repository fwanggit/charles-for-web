#!/usr/bin/env node
var express = require('express');
var router = express.Router();

var redis = require('redis'); 
var client =redis.createClient({ "host": "127.0.0.1", "port": "6379" });
/* echo server*/
var lists=function(req, res){
	
}

router.get('/lists', function(req, res, next) {
    lists(req, res);
});
router.post('/lists', function(req, res, next) {
    lists(req, res);
});
module.exports = router;