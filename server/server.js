var port = 9090

var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function(request, response) {
   // Don't need to handle HTTP requests.
});

server.listen(port, function() {});

socketServer = new WebSocketServer({httpServer: server});

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
});
