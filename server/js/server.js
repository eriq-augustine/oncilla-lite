'use strict';

var util = require('./../../shared/js/util.js').util;
var game = require('./../../server/js/game.js').game;

var server = {};
exports.server = server;

var WebSocketServer = require('ws').Server;
server.serverInstance = new WebSocketServer({port: 9090});

// TODO(eriq): Should be in namespace.
// TODO(eriq): These should be managed more closely and exposed only vio api.
server.gameId = 0;
server.games = {};
server.gamesByConnection = {};

// TODO(eriq): For now, just have a single pending game at a time
server.pendingConnection = null;

// HACK(eriq): This is to counter a circular dependency between connection.js and server.js.
var connection = require('./../../server/js/connection.js').connection;

server.serverInstance.on('connection', function(socket) {
   var conn = new connection.Connection(socket);

   //TEST
   console.log("Connection [%d] established", conn.id);

   if (server.pendingConnection) {
      var newgame = game.startGame(server.gameId, server.pendingConnection, conn);

      server.games[server.gameId++] = newgame;
      server.gamesByConnection[server.pendingConnection.id] = newgame;
      server.gamesByConnection[conn.id] = newgame;

      server.pendingConnection = null;
   } else {
      server.pendingConnection = conn;
   }
});
