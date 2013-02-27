'use strict';

var board = require('./../../shared/js/board.js').board;
var game = require('./../../shared/js/game.js').game;
var util = require('./../../shared/js/util.js').util;
var player = require('./../../server/js/player.js').player;

// HACK(eriq): Need to re-export because server will require this and
// not the shared one.
exports.game = game;

game.startGame = function(gameId, conn1, conn2) {
   // TODO(eriq): Load these
   // TODO(eriq): These should be kept in an array so there can be N players.
   var player1 = new player.ServerPlayer(0, 'advance-wars', 'red', conn1);
   var player2 = new player.ServerPlayer(1, 'circus', 'blue', conn2);

   // TODO(eriq): Grab types from the serialized game.
   var newgame = new game.ServerGame(gameId, -1,
                                     player1, player2,
                                     util.stockUnitTypes, util.stockTerrainTypes,
                                     null);

   // TODO(eriq): Load board, don't randomize.
   newgame.board.randomize(10, 10);

   // TODO(eriq): Centralize all messages.
   var message = {type: 'init_game',
                  game: newgame.serialize()};

   // Tell the client what player id they are.
   message.game.playerId = 0;
   conn1.send(JSON.stringify(message));

   message.game.playerId = 1;
   conn2.send(JSON.stringify(message));

   newgame.nextTurn([]);

   return newgame;
};

game.ServerGame = function(id, turn,
                           player1, player2,
                           unitTypes, terrainTypes,
                           boardData) {
   game.Game.call(this, id, turn, player1, player2, unitTypes, terrainTypes, boardData);

   // TODO(eriq): Keep track of all moves
   // [ [ moves for first turn ], ... ]
   this.player1Moves = [];
   this.player2Moves = [];

};
game.ServerGame.prototype = new game.Game();
game.ServerGame.prototype.constructor = game.ServerGame;

game.ServerGame.prototype.endTurn = function(moveset) {
   // TODO(eriq): Validate and make moves.

   game.Game.prototype.endTurn.call(this, moveset);
};

game.ServerGame.prototype.nextTurn = function(moveset) {
   game.Game.prototype.nextTurn.call(this);

   // Send a message to the player whose turn it now is.
   var message = JSON.stringify({type: 'yourTurn', enemyMoves: moveset});
   if (this.turn == 0) {
      this.player1.conn.send(message);
   } else {
      this.player2.conn.send(message);
   }
};
