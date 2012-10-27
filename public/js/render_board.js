define(['board_constants'], function(board_consts) {
   return function(board_props) {
      var board = '';

      for (var dimX = 0; dimX < board_props.rows; dimX++) {
         var xPos = dimX * board_consts.TILE_DIM;

         for (var dimY = 0; dimY < board_props.cols; dimY++) {
            var yPos = dimY * board_consts.TILE_DIM;
            var tileClass = board_consts.TILE_CLASS + ' ' +
                            board_props.map[dimX][dimY];

            var tileComponent = '<div class="' + tileClass + '" ' +
                                'data-x="' + dimX + '" ' +
                                'data-y="' + dimY + '" ' +
                                'style="position: absolute; top: ' +
                                xPos + 'px; left: ' + yPos + 'px;"></div>';

            board += tileComponent;
         }
      }

      document.getElementById(board_consts.BOARD_COMPONENT).innerHTML = board;
   }
});
