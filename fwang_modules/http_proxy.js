var net = require('net');
var http = require('http');
var url = require('url');
var child_process=require('child_process');
var cluster = require('cluster');

var VERSION = 'fwang Proxy 1.0'
var HTTPVER = 'HTTP/1.1'
var PORT = 8888
// Create an HTTP tunneling proxy
function connectionHandler(req, res) {
	console.log("-------connectionHandler\n"+req.method+" "+req.url);

    var clientURL = url.parse(req.url);
	if (typeof(clientURL.port) == undefined || clientURL.port==null)
	{
		clientURL.port=80;
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
		console.log("-------http.request\n"+req.url);
		//console.log((_res.headers));
		res.writeHead(_res.statusCode, _res.headers);
		//_res.setEncoding('utf8');
		_res.on('data', function (chunk) {
		    console.log('BODY: ');
			res.write(chunk);
		  });
		_res.on('end', function () {
		     res.end();
		});
    });
	req.on('data', function (chunk) {
		client.write(chunk);
		console.log('chunk: '+chunk);
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
exports.start_server = function (_port,isCluster) {
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
		if (typeof(_port) == undefined || _port==null)
		{
			_port=PORT;
		}
	   // Workers can share any TCP connection
	   // In this case it is an HTTP server
		http.createServer(connectionHandler).listen(_port,function() {
			console.log("now that "+VERSION+" is running:("+_port+")");
		});
    }
};
