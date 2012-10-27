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
