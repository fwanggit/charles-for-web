
var redis = require("redis"),
    client = redis.createClient();
	

exports.hook_request = function (tag,method,url,headers,chunk) {
	console.log(tag+","+url+','+headers)
	return chunk
}
exports.hook_respond = function (tag,statusCode,headers,chunk) {
	console.log(tag+","+statusCode+','+headers)
	return chunk
}
	