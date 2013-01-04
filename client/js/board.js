'use strict';

// HACK(eriq): No need to check if board is already defined because it is
// defined in the shared file.

board.BOARD_STATE = {
   NORMAL: 0,
   TILE_SELECTED: 1,
   MOVE_MODE: 2,
   ATTACK_MODE: 3,
};

// HACK(eriq): Override for ClientBoard and not Board.
board.deserialize = function(boardData) {
   var newBoard = new board.ClientBoard();
   newBoard.load(boardData);
   return newBoard;
};

// TODO(eriq): The highlights should either be merged or abandoned.
board.ClientBoard = function() {
   this.selection = null;
   this.moveHighlights = null;
   this.attackHighlights = null;
   this.state = board.BOARD_STATE.NORMAL;
};
board.ClientBoard.prototype = new board.Board();
board.ClientBoard.prototype.constructor = board.ClientBoard;

board.ClientBoard.prototype.exhaustUnit = function() {
   if (this.state != board.BOARD_STATE.TILE_SELECTED ||
       !this.selection ||
       !this.selection.unit ||
       !this.selection.unit.canAction(oncilla.game.turn)) {
      return;
   }

   this.selection.exhaustUnit();
   this.selection.deselect();
   this.selection = null;
   this.state = board.BOARD_STATE.NORMAL;
};

board.ClientBoard.prototype.enterAttackMode = function() {
   if (this.state != board.BOARD_STATE.TILE_SELECTED ||
       !this.selection ||
       !this.selection.unit ||
       !this.selection.unit.canAction(oncilla.game.turn)) {
      return;
   }

   this.state = board.BOARD_STATE.ATTACK_MODE;
   this.attackHighlights = this.getEnemiesInRange(this.selection.row, this.selection.col,
                                                  this.selection.unit.range, oncilla.game.turn);
   this.attackHighlights.forEach(function(tile) {
      tile.attackHighlight();
   }, this);
};

board.ClientBoard.prototype.enterMoveMode = function() {
   if (this.state != board.BOARD_STATE.TILE_SELECTED ||
       !this.selection ||
       !this.selection.unit ||
       !this.selection.unit.canMove(oncilla.game.turn)) {
      return;
   }

   this.moveHighlights = this.getPossibleMoves(this.selection.row, this.selection.col);
   this.moveHighlights.forEach(function(move) {
      this.board[move.row][move.col].moveHighlight();
   }, this);
   this.state = board.BOARD_STATE.MOVE_MODE;
};

board.ClientBoard.prototype.tileClicked = function(row, col) {
   if (this.state == board.BOARD_STATE.NORMAL || this.state == board.BOARD_STATE.TILE_SELECTED) {
      if (this.selection) {
         this.selection.deselect();
      }

      this.selection = this.board[row][col];
      this.state = board.BOARD_STATE.TILE_SELECTED;
      this.selection.select();
   // TODO(eriq): Keep unit selected after move.
   } else if (this.state == board.BOARD_STATE.MOVE_MODE) {
      var validMove = false;

      // If the movement is valid, go for it. Otherwise, just select the new square.
      for (var i = 0; i < this.moveHighlights.length; i++) {
         this.board[this.moveHighlights[i].row][this.moveHighlights[i].col].removeHighlight();

         if (this.moveHighlights[i].row == row && this.moveHighlights[i].col == col) {
            validMove = true;
         }
      }

      if (validMove) {
         serverValidateMove(this.selection, this.board[row][col]);
      }

      this.state = board.BOARD_STATE.NORMAL;
      this.selection.deselect();
      this.selection = null;
      this.moveHighlights = null;
   } else if (this.state == board.BOARD_STATE.ATTACK_MODE) {
      var validAttack = false;

      this.attackHighlights.forEach(function(tile) {
         tile.removeHighlight();

         if (tile.row == row && tile.col == col) {
            validAttack = true;
         }
      }, this);

      if (validAttack) {
         serverValidateAttack(this.selection, this.board[row][col]);
      }

      this.state = board.BOARD_STATE.NORMAL;
      this.selection.deselect();
      this.selection = null;
      this.attackHighlights = null;
   }
};

// TODO(eriq): redraw attacked unit
board.ClientBoard.prototype.attackUnit = function(playerTile, enemyTile) {
   //TODO(eriq): Only update affected tiles, not hole board.
   board.Board.prototype.attackUnit.call(this, playerTile, enemyTile);
   this.update(document.getElementById('board-area'));
};

// TODO(eriq): Sweet Animation
board.ClientBoard.prototype.moveUnit = function(startTile, endTile) {
   //TODO(eriq): Only update affected tiles, not hole board.
   board.Board.prototype.moveUnit.call(this, startTile, endTile);
   this.update(document.getElementById('board-area'));
};

board.ClientBoard.prototype.draw = function(container) {
   var html = ['<div id="board">'];

   for (var row = 0; row < this.board.length; row++) {
      html.push('<div class="board-row" data-row="' + row + '">');

      for (var col = 0; col < this.board[row].length; col++) {
         html.push(this.board[row][col].toHtml());
      }

      html.push('</div>');
   }

   html.push('</div>');
   container.innerHTML = html.join('');
};

// TODO(eriq): Only changed modified squares.
board.ClientBoard.prototype.update = function(container) {
   this.draw(container);
};

board.ClientBoard.prototype.advanceSprites = function() {
   for (var row = 0; row < this.board.length; row++) {
      for (var col = 0; col < this.board[row].length; col++) {
         this.board[row][col].advanceSprite();
      }
   }
};
