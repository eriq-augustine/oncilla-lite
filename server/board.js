exports.TestBoard = function() {
   this.rows = 10;
   this.cols = 10;
   this.map = [];

   var randomColors = ['red', 'blue', 'green'];
   for (var i = 0; i < this.rows; i++) {
      this.map[i] = [];
      for (var j = 0; j < this.rows; j++) {
         this.map[i][j] =
               randomColors[Math.floor(Math.random() * randomColors.length)];
      }
   }
};

exports.SuperTestBoard = function() {
   var units, terrain, rows, cols, map, tile;

   units = ['berserker', 'terror-bird'];
   terrain = ['grass', 'mountains'];

   rows = 10;
   cols = 10;
   map = [];

   for (var i = 0; i < rows; i++) {
      map[i] = [];
      for (var j = 0; j < cols; j++) {
         tile = {};
         unitChance = Math.floor(Math.random() * 10);
         if (unitChance <= 1) {
            tile.unit = { class: units[unitChance] };
         }

         tile.terrain = {
            class: terrain[Math.floor(Math.random() * terrain.length)]
         };

         map[i][j] = tile;
      }
   }

   return map;
};
