define(['board_constants'], function(board_consts) {
   return function(board_map) {
      var boardHTML = document.createElement('div');

      console.log(board_map);

      for (var dimX = 0; dimX < board_map.length; dimX++) {
         var xPos = dimX * board_consts.TILE_DIM;

         console.log(dimX);

         for (var dimY = 0; dimY < board_map[dimX].length; dimY++) {
            var yPos = dimY * board_consts.TILE_DIM;

            var tileObj = board_map[dimX][dimY];

            var unitObj = undefined;
            var terrainObj = tileObj.terrain.render();

            if (tileObj.unit) {
               unitObj = tileObj.unit.render();
            }

            var tileClass = board_consts.TILE_CLASS;

            var tileComponent = document.createElement('div');
            tileComponent.className = tileClass;
            tileComponent.style.position = 'absolute';
            tileComponent.style.top = xPos + 'px';
            tileComponent.style.left = yPos + 'px';

            if (unitObj) {
               tileComponent.appendChild(unitObj);
            }

            tileComponent.appendChild(terrainObj);

            boardHTML.appendChild(tileComponent);
         }
      }

      //document.getElementById(board_consts.BOARD_COMPONENT).innerHTML = boardHTML;
      document.getElementById(board_consts.BOARD_COMPONENT).appendChild(boardHTML);
      console.log(boardHTML);
   }
});
