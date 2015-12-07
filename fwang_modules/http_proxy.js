var net = require('net');
var http = require('http');
var url = require('url');

var VERSION = 'fwang Proxy 1.0'
var HTTPVER = 'HTTP/1.1'
var PORT = 8888
// Create an HTTP tunneling proxy
var proxy = http.createServer(function (req, res) {
	
	console.log("-------requestListener\n"+req.method+" "+req.url);
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
			console.log("-------http.request\n"+_res.url);
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
	        proxy.close();
	      });
	    });
});
proxy.listen(PORT,function() {
	console.log("now that "+VERSION+" is running");
	
});
/*
proxy.on('connect', function(req, cltSocket, head) {
  // connect to an origin server
	console.log("-------connect");
console.log("-------"+req.url);
  var srvUrl = url.parse('http://' + req.url);
  console.log(srvUrl)
  var srvSocket = net.connect(srvUrl.port, srvUrl.hostname, function() {
    cltSocket.write('HTTP/1.1 200 Connection Established\r\n' +
                    'Proxy-agent: Node-Proxy\r\n' +
                    '\r\n');
    srvSocket.write(head);
    srvSocket.pipe(cltSocket);
    cltSocket.pipe(srvSocket);
  });
});*/
/*
// now that proxy is running
proxy.listen(PORT,function() {

console.log("-------listen");
  // make a request to a tunneling proxy
  var options = {
    port: PORT,
    hostname: '127.0.0.1',
    method: 'CONNECT',
    path: 'www.qq.com:80'
  };

  var req = http.request(options);
  req.end();

  req.on('connect', function(res, socket, head) {
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
      proxy.close();
    });
  });
});*/
var method_others=function(req, cltSocket, head) {
  // connect to an origin server
  console.log("-------method_others");
  console.log(req);
  var srvUrl = url.parse('http://' + req.url);
  var srvSocket = net.connect(srvUrl.port, srvUrl.hostname, function() {
    cltSocket.write('HTTP/1.1 200 Connection Established\r\n' +
                    'Proxy-agent: Node-Proxy\r\n' +
                    '\r\n');
    srvSocket.write(head);
    srvSocket.pipe(cltSocket);
    cltSocket.pipe(srvSocket);
  });
};
/*
var server = net.createServer(function(c) { //'connection' listener
  console.log('client connected');
  c.on('end', function() {
    console.log('client disconnected');
  });
  c.write('hello\r\n');
  c.pipe(c);

});
server.listen(PORT, function() { //'listening' listener
  console.log('server bound');
});*/