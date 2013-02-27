'use strict';

// Override
game.deserialize = function(data) {
   return new game.ClientGame(data.id, data.turn,
                              data.player1, data.player2,
                              data.unitTypes, data.terrainTypes,
                              data.boardData,
                              data.playerId);
};

// playerId is the player that owns this client.
game.ClientGame = function(id, turn,
                           player1, player2,
                           unitTypes, terrainTypes,
                           boardData,
                           playerId) {
   game.Game.call(this, id, turn, player1, player2,
                  unitTypes, terrainTypes, boardData);
   this.playerId = playerId;

   // The moves made in this turn
   this.moveset = [];
};
game.ClientGame.prototype = new game.Game();
game.ClientGame.prototype.constructor = game.ClientGame;

// In the client, ending a turn puts the user into passive mode until the other player moves.
game.ClientGame.prototype.endTurn = function() {
   game.Game.prototype.endTurn.call(this);
   this.turn = -1;

   // TODO(eriq): Send moveset.
   socket.endTurn(this.moveset);
};

// Called when it is the player's turn.
game.ClientGame.prototype.playersTurn = function(enemyMoves) {
   this.turn = this.playerId;

   console.log("Enemy Moves:");
   console.log(enemyMoves);

   // TODO(eriq): These should be a better way to apply moves.
   enemyMoves.forEach(function(move) {
      switch (move.type) {
         case 'move':
            this.board.moveUnit(this.board.board[move.start.row][move.start.col],
                                this.board.board[move.end.row][move.end.col]);
            break;
         case 'attack':
            this.board.attackUnit(this.board.board[move.playerTile.row][move.playerTile.col],
                                  this.board.board[move.enemyTile.row][move.enemyTile.col]);
            break;
         default:
            console.log('ERROR: Unknown move type: ' + move.type);
      }
   }, this);
   // TODO(eriq): Make the moves.
   // TODO(eriq): Show stuff on the screen

   // TODO(eriq): There should be some options or something that says we are doing enemy moves.
   // Empty out the moveset
   this.moveset = [];
};
