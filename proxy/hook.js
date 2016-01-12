#!/usr/bin/env node
var redis = require('redis'); 
var client =redis.createClient({ "host": "127.0.0.1", "port": "6379" });
//client.FLUSHALL()
client.FLUSHDB()
exports.hook_request = function (tag,method,url,headers,chunk) {
	//console.log("---hook_request:"+tag+","+url)
   
	client.on("error", function (err) {
	   console.log("Error " + err);
	});
	request={
		"request":{
			"method":method,
		    "url":url,
	        "headers":JSON.stringify(headers)
         }
	 }
	client.hget("proxy",tag,function(err, replies) {
		
		//request=JSON.parse(replies)
		if(replies==null)
		{
			client.hset("proxy",tag,JSON.stringify(request));
		}
		if(chunk!=null)
		{
			console.log(tag+"_request_chunk",chunk.toString('hex'));
			client.append(tag+"_request_chunk",chunk.toString('hex'),function(err, append) {
				//console.log("append:",append);
				if(err!=null)
				{
					console.log("hook_respond:append:err:",err);
				}
				
			});
		}
		
		
	})
    
	
	// client.hkeys(tag, function(err, replies) {
//
//JSON.stringify
// 		if(replies==null){
// 		    client.hset(tag,"method",method,client.print);
// 			client.hset(tag,"url",url,client.print);
// 			client.hset(tag,"headers",headers,client.print);
// 			client.hset(tag,"chunk",chunk,client.print);
// 			console.log("err:" + err);
// 		}
// 		else
// 		{
// 		    console.log(replies.length + " replies:");
// 		    replies.forEach(function (reply, i) {
// 		        console.log("    " + i + ": " + reply);
// 		    });
// 			//reply.chunk+=chunk
// 	        //console.log("reply:",replies); //打印'string'
// 		}
//     });
    
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
	console.log("hook_respond:"+tag+","+statusCode)
	respond={
		"respond":{
			"statusCode":statusCode.toString(),
	        "headers":JSON.stringify(headers)
         }
	 }
	client.hget("proxy",tag,function(err, replies) {
		
		//request=JSON.parse(replies)
		if(replies==null)
		{
			client.hset("proxy",tag,JSON.stringify(request));
			client.del(tag+"_respond_chunk")
		}
		if(chunk!=null)
		{
			//console.log("chunk:",typeof(chunk));
			console.log(tag+"_respond_chunk",chunk.toString('hex'));
			client.append(tag+"_respond_chunk",chunk.toString('hex'),function(err, append) {
				//console.log("append:",append);
				if(err!=null)
				{
					console.log("hook_respond:append:err:",err);
				}
			});
		}
		
		
	})
	return chunk
};
	