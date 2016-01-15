#!/usr/bin/env node
var net = require('net');
var http = require('http');
var url = require('url');
var child_process=require('child_process');
var cluster = require('cluster');
var uuid = require('node-uuid');

var VERSION = 'fwang Proxy 1.0'
var HTTPVER = 'HTTP/1.1'
var PORT = 8888
var hook_request = null
var hook_respond = null
var tag=10000//uuid.v1();
// Create an HTTP tunneling proxy
function connectionHandler(req, res) {
	console.log(req.method+" "+req.url+"\n");
    var clientURL = url.parse(req.url);
	if (typeof(clientURL.port) == undefined || clientURL.port==null)
	{
		clientURL.port=80;
	}
	tag++
	if(hook_request!=null)
	{
		hook_request(tag,req.method,req.url,req.headers,null)
	}
	
	//console.log(req.url);
    var options = {
		port:clientURL.port,
      hostname: clientURL.hostname,
      method: req.method,
      path: clientURL.path,
		headers:req.headers
    };
    var client = http.request(options,function(_res) {
		//console.log("-------http.request\n"+req.url);
		if(hook_respond!=null)
		{
			hook_respond(tag,_res.statusCode, _res.headers,null)
		}
		res.writeHead(_res.statusCode, _res.headers);
		//_res.setEncoding('utf8');
		//chunks=[]
		_res.on('data', function (chunk) {
		    res.write(chunk);
			//chunks.push(chunk)
 			if(hook_respond!=null)
 			{
 				chunk=hook_respond(tag,_res.statusCode, _res.headers,chunk)
 			}
			
		  });
		_res.on('end', function () {
		   //   console.log('hook_respond(chunks): ',Buffer.concat(chunks));
			//res.write(chunk);
			res.end();
		});
    });
	//_chunks=[]
	req.on('end', function () {
		// console.log('hook_respond(chunks): ',Buffer.concat(_chunks));
		
		//client.write(chunk);
	});
	req.on('data', function (chunk) {
		//console.log('chunk: ',chunk.toString());
		client.write(chunk);
		if(hook_request!=null)
		{
			chunk=hook_request(tag,req.method,req.url,req.headers,chunk)
		}
		//chunks.push(chunk)
		
	});
	client.end();
	client.on('error', function (e) {
		console.log('exception:'+e.message);
	});

	client.on('connect', function(_res, socket, head) {
      console.log('got connected!');
      // make a request over an HTTP tunnel
      socket.write('GET / HTTP/1.1\r\n' +
                   'Host: www.qq.com:80\r\n' +
                   'Connection: close\r\n' +
                   '\r\n');
      socket.on('data', function(chunk) {
        console.log(chunk.toString());
      });
      socket.on('end', function() {
    
      });
    });
};
exports.start_server = function (_port,isCluster,_hook_request,_hook_respond) {
	
	_port = arguments[0] ? arguments[0] : PORT;
	hook_request = arguments[2] ? arguments[2] : null;
	hook_respond = arguments[3] ? arguments[3] : null;
	if (cluster.isMaster && isCluster) {
		var numCPUs = require('os').cpus().length;
	    for (var i = 0; i < numCPUs; i++) {
	       cluster.fork();
	    }
	    cluster.on('exit', function(worker, code, signal) {
	      console.log('worker ' + worker.process.pid + ' died');
	    });
	}
	else
	{
	   // Workers can share any TCP connection
	   // In this case it is an HTTP server
		http.createServer(connectionHandler).listen(_port,function() {
			console.log("now that "+VERSION+" is running:("+_port+")");
		});
    }
};
