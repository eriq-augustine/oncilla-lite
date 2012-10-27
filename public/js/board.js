define(['underscore', 'board_constants'], function(_, boardConstants) {
   var Board;

   Board = function(kwargs) {
      kwargs = kwargs || {};
      this.map = kwargs.map || [];

      this.selectedUnit = null;
      this.locationHighlights = [];
      document.getElementById('game_board').onclick = this.doOnClick.bind(this);
   };

   _.extend(Board.prototype, {
      setMap: function(bundle) {
         this.map = bundle.map;
      },

      render: function() {
         var $unit, $terrain, $tile, $board,
             rows, cols, tile, tileClass, x, y;

         $board = $('<div>');

         rows = this.map.length;
         for (var row = 0; row < rows; row++) {
            cols = this.map[row].length;

            for (var col = 0; col < cols; col++) {
               $tile = this.renderTile(row, col);
               $board.append($tile);
            }
         }

         $('#' + boardConstants.BOARD_COMPONENT).append($board);
      },

      renderTile: function(row, col, x, y) {
         var tile, tileClass, $terrain, $unit, x, y;

         x = row * boardConstants.TILE_DIM;
         y = col * boardConstants.TILE_DIM;

         tile = this.map[row][col];
         $tile = $('#tile-' + row + '-' + col);
         $terrain = tile.terrain.render();

         if (tile.unit)
            $unit = tile.unit.render();

         if ($tile.length) {
            $tile.empty();
         }
         else {
            $tile = $('<div>')
               .addClass(boardConstants.TILE_CLASS)
               .attr('id', 'tile-' + row + '-' + col)
               .css('position', 'absolute')
               .css('top', x + 'px')
               .css('left', y + 'px');
         }

         if (tile.selected)
            $tile.addClass('selected');
         else
            $tile.removeClass('selected');

         if ($unit)
            $tile.append($unit);
         $tile.append($terrain);

         return $tile;
      },

      doOnClick: function(event) {
         var row = Math.floor(event.y / boardConstants.TILE_DIM);
         var col = Math.floor(event.x / boardConstants.TILE_DIM);

         this.locationHighlights.forEach(function(position) {
            this.map[position.row][position.col].selected = false;
            this.renderTile(position.row, position.col);
         }, this);

         if (this.selectedUnit) {
            if (this.map[row][col].unit) {
               // TODO(eriq): Attack
            } else {
               if (Math.abs(row - this.selectedUnit.row) + Math.abs(col - this.selectedUnit.col) <= this.selectedUnit.unit.movePoints) {
                  this.map[row][col].unit = this.selectedUnit.unit;
                  this.renderTile(row, col);

                  this.map[this.selectedUnit.row][this.selectedUnit.col].unit = null;
                  this.renderTile(this.selectedUnit.row, this.selectedUnit.col);
               }
            }

            this.selectedUnit = null;
         } else {
            if (this.map[row][col].unit) {
               this.locationHighlights = findReachableLocations(row, col, this.map, this.map[row][col].unit.movePoints);
               this.locationHighlights.forEach(function(position) {
                  this.map[position.row][position.col].selected = true;
                  this.renderTile(position.row, position.col);
               }, this);
               this.selectedUnit = {row: row, col: col, unit: this.map[row][col].unit};
            }
         }
      }
   });

   function findReachableLocations(row, col, map, move) {
      var reachables = [];

      var startRow = row - move < 0 ? 0 : row - move;
      var startCol = col - move < 0 ? 0 : col - move;
      var endRow = row + move > map.length ? map.length : row + move;
      var endCol = col + move > map.length ? map.length : col + move;

      for (var i = startRow; i < endRow; i++) {
         for (var j = startCol; j < endCol; j++) {
            if (Math.abs(i - row) + Math.abs(j - col) <= move) {
               reachables.push({row: i, col: j});
            }
         }
      }

      return reachables;
   };

   return Board;
});
