define(['underscore'], function(_) {
   var Board;

   Board = function(kwargs) {
      kwargs = kwargs || {};
      this.map = kwargs.map || [];

      this.selectedUnit = null;
      this.locationHighlights = [];

      document.getElementById('game_board').onclick = function(event) {
         var row = event.target.dataset.x;
         var col = event.target.dataset.y;

         locationHigilights.forEach(function(position) {
            position.selected = false;
            position.render(row, col);
         });

         if (selectedUnit) {
            if (map[row][col].unit) {
               // TODO(eriq): Attack
            } else {
               if (Math.abs(row - selectedUnit.row) + Math.abs(col - selectedUnit.col) <= selectedUnit.unit.movePoints) {
                  map[row][col].unit = selectedUnit.unit;
                  map[row][col].render();

                  map[selectedUnit.row][selectedUnit.col].unit = null;
                  map[selectedUnit.row][selectedUnit.col].render();
               }
            }

            selectedUnit = null;
         } else {
            if (map[row][col].unit) {
               locationHighlights = findReachableLocations(row, col, map, map[row][col].unit.movePoints);
               locationHigilights.forEach(function(position) {
                  position.selected = true;
                  position.render(row, col);
               });
               selectedUnit = {row: row, col: col, unit: map[row][col].unit};
            }
         }
      };
   };

   _.extend(Board.prototype, {
      setMap: function(bundle) {
         this.map = bundle.map;
      },
      render: function() {
      },
      renderTile: function(x, y) {
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
               reachables.push(map[i][j]);
            }
         }
      }

      return reachables;
   };

   return Board;
});
