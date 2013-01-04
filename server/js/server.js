'use strict';

var util = require('./../../shared/js/util.js').util;
var game = require('./../../server/js/game.js').game;

var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({port: 9090});

var connectionId = 0;
var gameId = 0;
var games = {};

wss.on('connection', function(ws) {
   //TEST
   console.log("Connection [%d] established", connectionId);

   ws.on('message', onMessage.bind(this, connectionId, ws));
   ws.on('error', onError.bind(this, connectionId, ws));
   ws.on('close', onClose.bind(this, connectionId, ws));

   // TODO(eriq): Wait for two players later. Pass both sockets over.
   games[gameId] = game.startGame(gameId, ws, connectionId);

   gameId++;
   connectionId++;
});

function onMessage(connectionId, socket, message) {
   //ws.send
   console.log("Socket [%d]: Message: ", connectionId);
   console.log('' + message);

   //TEST: Always validate
   var data = JSON.parse(message);
   if (data.requestValidation) {
      socket.send(JSON.stringify({validationStatus: true, id: data.id}));
   }
}

function onError(connectionId, socket) {
   console.log("Error on socket [%d].", connectionId);
}

function onClose(connectionId, socket) {
   console.log("Socket [%d] has been closed", connectionId);
}
