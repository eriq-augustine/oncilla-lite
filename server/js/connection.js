'use strict';

var server = require('./../../server/js/server.js').server;

var connection = {};
exports.connection = connection;

// TODO(eriq): These should be monitored more closely and only exposed via api.
connection.nextId = 0;
connection.connections = {};

connection.Connection = function(socket) {
   this.id = connection.nextId++;
   this.socket = socket;

   this.socket.on('message', connection.onMessage.bind(this, this));
   this.socket.on('error', connection.onError.bind(this, this));
   this.socket.on('close', connection.onClose.bind(this, this));

   connection.connections[this.id] = this;
};

connection.Connection.prototype.send = function(message) {
   this.socket.send(message);
};

connection.onMessage = function(conn, message) {
   //ws.send
   console.log("Socket [%d]: Message: ", conn.id);
   console.log('' + message);

   //TEST: Always validate
   var data = JSON.parse(message);
   if (data.requestValidation) {
      conn.socket.send(JSON.stringify({validationStatus: true, id: data.id}));
   } else if (data.type == 'endTurn') {
      server.gamesByConnection[conn.id].endTurn(data.moveset);
   }
};

connection.onError = function(conn) {
   console.log("Error on socket [%d].", conn.id);
};

// TODO(eriq): Closeup the game
connection.onClose = function(conn) {
   console.log("Socket [%d] has been closed", conn.id);
};
