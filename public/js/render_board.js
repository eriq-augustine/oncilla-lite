define(['board_constants'], function(board_consts) {
   return function(board_map) {
      var boardHTML = '';

      console.log(board_map);

      for (var dimX = 0; dimX < board_map.length; dimX++) {
         var xPos = dimX * board_consts.TILE_DIM;

         console.log(dimX);

         for (var dimY = 0; dimY < board_map[dimX].length; dimY++) {
            var yPos = dimY * board_consts.TILE_DIM;

            var tileObj = board_map[dimX][dimY];

            var unitObj = tileObj.unit.render();
            var terrainObj = tileObj.terrain.render();

            var tileClass = board_consts.TILE_CLASS;

            var tileComponent = '<div> ' +
                                'class="' + tileClass + '" ' +
                                'data-x="' + dimX + '" ' +
                                'data-y="' + dimY + '" ' +
                                'style="position: absolute; ' +
                                       'top: ' + xPos + 'px; ' +
                                       'left: ' + yPos + 'px;">' +
                                unitObj.innerHTML +
                                terrainObj.innerHTML +
                                '</div>';

            boardHTML += tileComponent;
         }
      }

      document.getElementById(board_consts.BOARD_COMPONENT).innerHTML = boardHTML;
   }
});
