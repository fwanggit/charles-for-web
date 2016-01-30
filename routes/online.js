#!/usr/bin/env node

exports.bind = function(server) {
	var io = require('socket.io')(server);
	start(io)
}
exports.create = function(port) {
	var io = require('socket.io')(port);
	start(io)
}
function start(io)
{
	io.on('connection',connected);
    io.clients(clients);
}
var sockets={}
var connected = function(socket) {
	sockets[socket.handshake.address]=socket
	console.log('a user connected:',socket.handshake.address);
	/*
	socket.broadcast.emit('hi');
	socket.emit('proxy', "hi!");
	*/
	socket.on('proxy', function(msg){
	    console.log('message: ' + msg);
		//socket.emit('proxy', msg);
	  });
	socket.on('disconnect', function(){
		delete sockets[socket.handshake.address]
		console.log('user disconnected:',socket.handshake.address);
	});
}
var clients = function(error, clients) {
	console.log('clients:',clients);
	
}
exports.send = function(msg) {
	for (var key in sockets)
	{
		
		socket=sockets[key]
		socket.emit('proxy', msg);
	}
	
}