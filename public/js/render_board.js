define(['board_constants'], function(board_consts) {
   return function(board_props) {
      var board = '', tile_id = 'tile_';

      for (var dim_x = 0; dim_x < board_props.rows; dim_x++) {
         var x_pos = dim_x * board_consts.TILE_DIM;
         tile_id += dim_x + '_';

         for (var dim_y = 0; dim_y < board_props.cols; dim_y++) {
            var y_pos = dim_y * board_consts.TILE_DIM;
            var tile_class = board_consts.TILE_CLASS + ' ' +
                             board_props.map[dim_x][dim_y];

            tile_id = 'tile_' + dim_x + '_' + dim_y;

            var tile_component = '<div class="' + tile_class + '" ' +
                                 'data-x="' + dim_x + '" ' +
                                 'data-y="' + dim_y + '" ' +
                                 'id="' + tile_id + '" ' +
                                 'style="position: absolute; top: ' +
                                 x_pos + 'px; left: ' + y_pos + 'px;"' +
                                 '></div>';

            board += tile_component;
         }
      }

      console.log(board);
      document.getElementById(board_consts.BOARD_COMPONENT).innerHTML = board;
   }
});
