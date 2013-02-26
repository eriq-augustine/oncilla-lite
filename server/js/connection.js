'use strict';

var connection = {};
exports.connection = connection;

connection.nextId = 0;

connection.Connection = function(socket) {
   this.id = connection.nextId++;
   this.socket = socket;

   this.socket.on('message', connection.onMessage.bind(this, this));
   this.socket.on('error', connection.onError.bind(this, this));
   this.socket.on('close', connection.onClose.bind(this, this));
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
   }
};

connection.onError = function(conn) {
   console.log("Error on socket [%d].", conn.id);
};

connection.onClose = function(conn) {
   console.log("Socket [%d] has been closed", conn.id);
};
