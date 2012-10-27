define(['underscore', 'board_constants'], function(_, board_consts) {
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
      },
      renderTile: function(row, col) {
         tile = this.map[row][col];
         ele = document.getElementById('tile-' + row + '-' + col);
         ele.innerHTML = '';

         console.log("render: " + row + ", " + col);

         if (tile.selected) {
            ele.className = board_consts.TILE_CLASS + ' selected';
         } else {
            ele.className = board_consts.TILE_CLASS;
         }

         if (tile.unit) {
            ele.appendChild(tile.unit.render());
         }

         ele.appendChild(tile.terrain.render());
      },
      doOnClick: function(event) {
         var row = Math.floor(event.y / board_consts.TILE_DIM);
         var col = Math.floor(event.x / board_consts.TILE_DIM);

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
