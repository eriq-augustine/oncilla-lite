define(['underscore'], function(_) {
   var port = 9090;

   var Game = function() {
      this.connection = new WebSocket('ws://127.0.0.1:' + port);
      this.connection.onopen = _.bind(this.onOpen, this);
      this.connection.onerror = _.bind(this.onError, this);
      this.connection.onmessage = _.bind(this.onMessage, this);
      this.connection.onclose = _.bind(this.onClose, this);
   };

   Game.prototype.start = function() {
      console.log('starting a game, yeeeeehaw');
   };

   Game.prototype.onOpen = function() {
      // connection is ready
   };

   Game.prototype.onError = function(error) {
      console.log("JS Error: error");
   };

   Game.prototype.onMessage = function(message) {
      var json = null;
      console.log(message);

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
