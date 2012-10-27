define(['underscore'], function(_) {
   var port = 9090;

   var Game = function() {
      this.connection = new WebSocket('ws://127.0.0.1:' + port);
      window.connection = connection;

      this.connection


   };

   Game.prototype.start = function() {
      console.log('starting a game, yeeeeehaw');
   };

   Game.prototype.onopen = function() {
      // connection is ready
   };

   Game.prototype.onerror = function(error) {
      console.log("JS Error: error");
   };

   Game.prototype.onMessage = function(message) {
      var json = null;

      try {
         json = JSON.parse(message.data);
      } catch (e) {
         console.log('Failed to parse JSON: ', message.data);
         return;
      }

      console.log(json);
   };

   Game.prototype.onClose = function() {
      console.log('Socket is closing.');
   };

   return Game;
});
