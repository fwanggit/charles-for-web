var net = require('net');

var VERSION = 'fwang Proxy 1.0'
var HTTPVER = 'HTTP/1.1'
var PORT = 8888
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
});