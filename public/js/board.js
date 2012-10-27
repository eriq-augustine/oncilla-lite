define(['underscore'], function(_) {
   var Board;

   Board = function(kwargs) {
      kwargs = kwargs || {};
      this.cols = kwargs.cols || 0;
      this.rows = kwargs.rows || 0;
      this.map = kwargs.map || [];
   };

   _.extend(Board.prototype, {
      setMap: function(bundle) {
         this.cols = bundle.cols;
         this.rows = bundle.rows;
         this.map = bundle.map;
      }
   });

   return Board;
});
