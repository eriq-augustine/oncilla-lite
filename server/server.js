var port = 9090

var connect = require('connect');
var WebSocketServer = require('websocket').server;
var http = require('http');
var fs = require('fs');
var board = require('../server/board.js');

var server = connect.createServer(
   connect.static(__dirname + '/../public')
).listen(9090);

var socketServer = new WebSocketServer({httpServer: server});

socketServer.on('request', function(request) {
   var connection = request.accept(null, request.origin);

   connection.on('error', function(error) {
      console.log("WebSocket Error: " + error);
   });

   connection.on('message', function(message) {
      console.log("Got message: " + message);
   });

   connection.on('close', function(connection) {
      console.log("WebSocket Closed: " + connection);
   });

   // Init the board right away.
   //var message = {'type': 'init_board', 'board': new board.TestBoard()};
   var message = {'type': 'init_board', 'board': board.SuperTestBoard()};
   connection.send(JSON.stringify(message));
});
