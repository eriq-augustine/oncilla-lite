'use strict';

var unit = require('./../../shared/js/unit.js').unit || unit;
var terrain = require('./../../shared/js/terrain.js').terrain || terrain;
var board = require('./../../shared/js/board.js').board || board;

var game = {};
exports.game = game;

game.deserialize = function(data) {
   return new game.Game(data.id, data.turn,
                        data.player1, data.player2,
                        data.unitTypes, data.terrainTypes,
                        data.boardData);
};

game.Game = function(id, turn,
                     player1, player2,
                     unitTypes, terrainTypes,
                     boardData) {
   this.id = id;
   this.turn = turn;

   this.player1 = player1;
   this.player2 = player2;

   this.unitTypes = unitTypes || [];
   this.unitTypes.forEach(function(type) {
      unit.addType(type);
   });
   this.terrainTypes = terrainTypes || [];
   this.loadTypes();

   // TODO(eriq): Don't randomize.
   if (!boardData) {
      this.board = new board.Board();
      //this.board.randomize(10, 10);
   } else {
      this.board = board.deserialize(boardData);
   }
};

game.Game.prototype.loadTypes = function() {
   this.unitTypes.forEach(function(type) {
      unit.addType(type);
   });

   this.terrainTypes.forEach(function(type) {
      terrain.addType(type);
   });
};

// TODO(eriq): Eventually, full unit types (just identifiers) will not be saved with the game.
// They will be placed somewhere more accesible to all games.
game.Game.prototype.serialize = function() {
   return {id: this.id,
           turn: this.turn,
           player1: this.player1.serialize(),
           player2: this.player2.serialize(),
           boardData: this.board.serialize(),
           unitTypes: this.unitTypes,
           terrainTypes: this.terrainTypes};
};

// TODO(eriq): Probably just redraw the entire board.
// TODO(eriq): This will have to be a little more complex to abstract to more than two players.
// TODO(eriq): Monies?
game.Game.endTurn = function() {
   // TODO(eriq): Maintain some structures that organize units.
   this.board.board.forEach(function(row) {
      row.forEach(function(tile) {
         tile.refresh();
      });
   });

   this.turn = (this.turn + 1) % 2;
};
