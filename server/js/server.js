'use strict';

var util = require('./../../shared/js/util.js').util;
var game = require('./../../server/js/game.js').game;
var connection = require('./../../server/js/connection.js').connection;

var WebSocketServer = require('ws').Server;
var serverInstance = new WebSocketServer({port: 9090});

var gameId = 0;
var games = {};

// TODO(eriq): For now, just have a single pending game at a time
var pendingConnection = null;

serverInstance.on('connection', function(socket) {
   var conn = new connection.Connection(socket);

   //TEST
   console.log("Connection [%d] established", conn.id);

   if (pendingConnection) {
      games[gameId] = game.startGame(gameId, pendingConnection, conn);
      gameId++;
      pendingConnection = null;
   } else {
      pendingConnection = conn;
   }
});
