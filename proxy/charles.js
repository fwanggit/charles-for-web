#!/usr/bin/env node
var redis = require('redis'); 
var client =redis.createClient({ "host": "127.0.0.1", "port": "6379" });

exports.hook_request = function (tag,method,url,headers,chunk) {
	console.log("---hook_request:"+tag+","+url)
   
	client.on("error", function (err) {
	   console.log("Error " + err);
	});
	client.hgetall(tag, function(err, reply) {
		if(reply==null){
		    client.hmset(tag,"method",method,"url",url,"headers",headers,"chunk",chunk);
		}
		else
		{
			reply.chunk+=chunk
			console.log("reply:",reply); //打印'string'
		}
    });
    
/*
	client.set("string key", "string val", redis.print);
	client.hset("hash key", "hashtest 1", "some value", redis.print);
	client.hset(["hash key", "hashtest 2", "some other value"], redis.print);
	client.hkeys("hash key", function (err, replies) {
	    console.log(replies.length + " replies:");
	    replies.forEach(function (reply, i) {
	        console.log("    " + i + ": " + reply);
	    });
	    client.quit();
	});
	*/
	return chunk;
};
exports.hook_respond = function (tag,statusCode,headers,chunk) {
	console.log(tag+","+statusCode+','+headers)
	return chunk
};
	