define(['board_constants'], function(board_consts) {
   return function(board_props) {
      var board = '', tile_id = 'tile_';

      for (var dim_x = 0; dim_x < board_props.rows; dim_x++) {
         var x_pos = dim_x * board_consts.TILE_DIM;
         tile_id += dim_x + '_';

         for (var dim_y = 0; dim_y < board_props.cols; dim_y++) {
            var y_pos = dim_y * board_consts.TILE_DIM;
            var tile_component = '<div></div>';
            var tile_class = board_consts.TILE_CLASS + ' ' +
                             board_props.map[dim_x][dim_y];

            tile_id += dim_y;

            tile_component.setAttribute('class', tile_class);
            tile_component.setAttribute('id', tile_id);

            tile_component.style.position = 'absolute';
            tile_component.style.top = x_pos + 'px';
            tile_component.style.left = y_pos + 'px';

            board += tile_component;
         }
      }
   }
});
