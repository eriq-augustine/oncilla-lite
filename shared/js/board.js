'use strict';

var board = {};
exports.board = board;

var unit = require('./../../shared/js/unit.js').unit || unit;
var terrain = require('./../../shared/js/terrain.js').terrain || terrain;
var tile = require('./../../shared/js/tile.js').tile || tile;

board.deserialize = function(boardData) {
   var newBoard = new board.Board();
   newBoard.load(boardData);
   return newBoard;
};

board.Board = function() {
   this.board = [];
};

board.Board.prototype.load = function(boardJson) {
   this.board = [];

   for (var row = 0; row < boardJson.length; row++) {
      var boardRow = [];

      for (var col = 0; col < boardJson[row].length; col++) {
         var unitObj = boardJson[row][col].unit ?
                       unit.deserialize(boardJson[row][col].unit) :
                       null;

         boardRow.push(new tile.Tile(unitObj,
                                     terrain.deserialize(boardJson[row][col].terrain),
                                     row, col));
      }

      this.board.push(boardRow);
   }
};

board.Board.prototype.serialize = function() {
   var res = [];

   for (var row = 0; row < this.board.length; row++) {
      res.push([]);

      for (var col = 0; col < this.board[row].length; col++) {
         var unitObj = this.board[row][col].unit ?
                       this.board[row][col].unit.serialize() :
                       null;
         res[row].push({unit: unitObj,
                        terrain: this.board[row][col].terrain.serialize()});
      }
   }

   return res;
};

board.Board.prototype.randomize = function(rows, cols) {
   var boardJson = [];

   for (var row = 0; row < rows; row++) {
      boardJson[row] = [];

      for (var col = 0; col < cols; col++) {
         var tile = {}

         if (Math.random() < 0.75) {
            tile.terrain = terrain.getTerrain('plains').serialize();
         } else {
            tile.terrain = terrain.getTerrain('mountains').serialize();
         }

         if (Math.random() < 0.1) {
            if (Math.random() < 0.5) {
               /*
               if (Math.random() < 0.5) {
                  tile.unit = unit.getStockUnit('infantry', 'advance-wars', 'red').serialize();
               } else {
                  tile.unit = unit.getStockUnit('clown', 'circus', 'red').serialize();
               }
               */
               tile.unit = unit.getStockUnit('infantry', 'advance-wars', 'red').serialize();
               tile.unit.player = 0;
            } else {
               tile.unit = unit.getStockUnit('clown', 'circus', 'blue').serialize();
               tile.unit.player = 1;
            }
         }

         boardJson[row][col] = tile;
      }
   }

   this.load(boardJson);
};

// TODO(eriq): Sweet Animation
board.Board.prototype.moveUnit = function(startTile, endTile) {
   startTile.unit.moved();
   // Need full swap because of moving to same square.
   var temp = startTile.unit;
   startTile.unit = null;
   endTile.unit = temp;
}

board.Board.prototype.getEnemiesInSelectionsRange = function() {
   if (this.state != board.BOARD_STATE.TILE_SELECTED ||
       !this.selection ||
       !this.selection.unit ||
       !this.selection.unit.canAction(oncilla.game.turn)) {
      return [];
   }

   return this.getEnemiesInRange(this.selection.row, this.selection.col,
                                 this.selection.unit.range,
                                 this.selection.unit.player);
};

board.Board.prototype.attackUnit = function(playerTile, enemyTile) {
   // TODO(eriq): Lots of stuff (weapon, types, armor, etc).
   playerTile.unit.exhaust();
   enemyTile.unit.hp -= playerTile.unit.attack;

   // TODO(eriq): Go through proper dying procedure.
   if (enemyTile.unit.hp <= 0) {
      enemyTile.unit = null;
   }
};

// |checked| is used internally, don't pass it in.
board.Board.prototype.getEnemiesInRange = function(row, col, range, player, checked) {
   checked = checked || {};

   if (row < 0 || col < 0 ||
       row >= this.board.length || col >= this.board[row].length ||
       range < 0 ||
       checked['' + row + '-' + col]) {
      return [];
   }

   checked['' + row + '-' + col] = true;
   var rtn = [];

   if (this.board[row][col].unit && this.board[row][col].unit.player != player) {
      rtn = [this.board[row][col]];
   }

   return rtn.concat(this.getEnemiesInRange(row - 1, col, range - 1, player, checked),
                     this.getEnemiesInRange(row + 1, col, range - 1, player, checked),
                     this.getEnemiesInRange(row, col + 1, range - 1, player, checked),
                     this.getEnemiesInRange(row, col - 1, range - 1, player, checked));
};

// TODO(eriq): Move type
// TODO(eriq): Need to remember path
// TODO(eriq): Can go through allies, but not enemies.
// TODO(eriq): Why not pass back Tiles?
board.Board.prototype.getPossibleMoves = function(row, col) {
   var possibleMoves = {};
   var tilesToCheck = [{row: row, col: col, movesLeft: this.board[row][col].unit.move}];

   this.getPossibleMovesHelper(possibleMoves, tilesToCheck);
   var rtn = [];
   for (var move in possibleMoves) {
      rtn.push(possibleMoves[move])
   }

   return rtn;
};

// NOTE: This assumes a rectangular board.
board.Board.prototype.getPossibleMovesHelper = function(possibleMoves, tilesToCheck) {
   while (tilesToCheck.length > 0) {
      var currentTile = tilesToCheck.pop();

      possibleMoves['' + currentTile.row + '-' + currentTile.col] = {row: currentTile.row, col: currentTile.col};

      // Up
      if (currentTile.row > 0 &&
          this.board[currentTile.row - 1][currentTile.col].terrain.movecost <= currentTile.movesLeft &&
          !this.board[currentTile.row - 1][currentTile.col].unit) {
         tilesToCheck.push({row: currentTile.row - 1,
                           col: currentTile.col,
                           movesLeft: currentTile.movesLeft - this.board[currentTile.row - 1][currentTile.col].terrain.movecost});
      }

      // Down
      if (currentTile.row < this.board.length - 1 &&
          this.board[currentTile.row + 1][currentTile.col].terrain.movecost <= currentTile.movesLeft &&
          !this.board[currentTile.row + 1][currentTile.col].unit) {
         tilesToCheck.push({row: currentTile.row + 1,
                           col: currentTile.col,
                           movesLeft: (currentTile.movesLeft - this.board[currentTile.row + 1][currentTile.col].terrain.movecost)});
      }

      // Left
      if (currentTile.col > 0 &&
          this.board[currentTile.row][currentTile.col - 1].terrain.movecost <= currentTile.movesLeft &&
          !this.board[currentTile.row][currentTile.col - 1].unit) {
         tilesToCheck.push({row: currentTile.row,
                           col: currentTile.col - 1,
                           movesLeft: currentTile.movesLeft - this.board[currentTile.row][currentTile.col - 1].terrain.movecost});
      }

      // Right
      if (currentTile.col < this.board[currentTile.row].length - 1 &&
          this.board[currentTile.row][currentTile.col + 1].terrain.movecost <= currentTile.movesLeft &&
          !this.board[currentTile.row][currentTile.col + 1].unit) {
         tilesToCheck.push({row: currentTile.row,
                           col: currentTile.col + 1,
                           movesLeft: currentTile.movesLeft - this.board[currentTile.row][currentTile.col + 1].terrain.movecost});
      }
   }
};
