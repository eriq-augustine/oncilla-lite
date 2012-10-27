define(['jquery', 'board_constants'], function($, board_consts) {
   return function(board_map) {
      var $unit, $terrain, $tile, $board, tile, tileClass, x, y;
      $board = $('<div>');
      tileClass = board_consts.TILE_CLASS;


      for (var dimX = 0; dimX < board_map.length; dimX++) {
         x = dimX * board_consts.TILE_DIM;

         for (var dimY = 0; dimY < board_map[dimX].length; dimY++) {
            y = dimY * board_consts.TILE_DIM;

            tile = board_map[dimX][dimY];
            $terrain = tile.terrain.render();
            if (tile.unit)
               $unit = tile.unit.render();
            else
               $unit = undefined;

            $tile = $('<div>')
               .addClass(tileClass)
               .css('position', 'absolute')
               .css('top', x + 'px')
               .css('left', y + 'px');

            if ($unit)
               $tile.append($unit);
            $tile.append($terrain);

            $board.append($tile);
         }
      }

      $('#' + board_consts.BOARD_COMPONENT).append($board);
   }
});
