'use strict';

var board = require('./../../shared/js/board.js').board;
var game = require('./../../shared/js/game.js').game;
var util = require('./../../shared/js/util.js').util;
var player = require('./../../shared/js/player.js').player;

// HACK(eriq): Need to re-export because server will require this and
// not the shared one.
exports.game = game;

game.startGame = function(gameId, conn1, conn2) {
   // TODO(eriq): Load these
   // TODO(eriq): Make these server players and pass their connections.
   var player1 = new player.Player(0, 'advance-wars', 'red', conn1);
   var player2 = new player.Player(1, 'circus', 'blue', conn2);

   // TODO(eriq): Grab types from the serialized game.
   var newgame = new game.ServerGame(gameId, 0,
                                     player1, player2,
                                     util.stockUnitTypes, util.stockTerrainTypes,
                                     null);

   // TODO(eriq): Load board, don't randomize.
   newgame.board.randomize(10, 10);

   // TODO(eriq): Centralize all messages.
   var message = {type: 'init_game',
                  game: newgame.serialize()};

   conn1.send(JSON.stringify(message));
   conn2.send(JSON.stringify(message));

   return game;
};

game.ServerGame = function(id, turn,
                           player1, player2,
                           unitTypes, terrainTypes,
                           boardData) {
   game.Game.call(this, id, turn, player1, player2, unitTypes, terrainTypes, boardData);
};
game.ServerGame.prototype = new game.Game();
game.ServerGame.prototype.constructor = game.ServerGame;
