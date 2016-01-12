#!/usr/bin/env node
var express = require('express');
var router = express.Router();

var redis = require('redis'); 

/* echo server*/
lists=function(req, res){
	var _list=[]
	var client =redis.createClient({ "host": "127.0.0.1", "port": "6379" });
	client.hkeys("proxy", function(err, replies) {
		if(replies==null || replies.length==0)
		{
			client.quit()
			res.send("{}")
		}
		
		replies.forEach(function (tag, i) {
		   
			
			client.hget("proxy",tag,function (err, _request) {
				console.log("    " + i + ": " + tag);
				_list.push("{"+tag+":"+_request+"}")
				if(i==replies.length-1)
				{
					res.send(JSON.stringify(_list))
					client.quit()
				}
			})
	     });
		 
	 });
}

router.get('/lists', function(req, res, next) {
    lists(req, res);
});
router.post('/lists', function(req, res, next) {
    lists(req, res);
});
module.exports = router;