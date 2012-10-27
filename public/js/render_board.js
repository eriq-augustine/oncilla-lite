define(['board_constants'], function(board_consts) {
   return function(board_map) {
      var boardHTML = '<div></div>';

      console.log(board_map);

      for (var dimX = 0; dimX < board_map.length; dimX++) {
         var xPos = dimX * board_consts.TILE_DIM;

         console.log(dimX);

         for (var dimY = 0; dimY < board_map[dimX].length; dimY++) {
            var yPos = dimY * board_consts.TILE_DIM;

            var tileObj = board_map[dimX][dimY];

            //var unitObj = undefined;
            var terrainObj = tileObj.terrain.render();

            /*
            if (tileObj.unit) {
               unitObj = tileObj.unit.render();
            }
            */

            var tileClass = board_consts.TILE_CLASS;

            var tileComponent = '<div> ' +
                                'class="' + tileClass + '" ' +
                                'data-x="' + dimX + '" ' +
                                'data-y="' + dimY + '" ' +
                                'style="position: absolute; ' +
                                       'top: ' + xPos + 'px; ' +
                                       'left: ' + yPos + 'px;">' +
                                '</div>';
            var boardComponent = document.createElement(tileComponent);
            /*
            if (unitObj) {
               boardComponent.appendChild(unitObj);
            }
            */

            boardComponent.appendChild(terrainObj);

            boardHTML.appendChild(boardComponent);
         }
      }

      //document.getElementById(board_consts.BOARD_COMPONENT).innerHTML = boardHTML;
      document.getElementById(board_consts.BOARD_COMPONENT).appendChild(boardHTML);
   }
});
