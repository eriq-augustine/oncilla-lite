define(['underscore', 'board', 'render_board'], function(_, Board, render) {
   var port = 9090;

   var Game = function() {
      this.board = new Board();

      this.connection = new WebSocket('ws://127.0.0.1:' + port);
      this.connection.onopen = _.bind(this.onOpen, this);
      this.connection.onerror = _.bind(this.onError, this);
      this.connection.onmessage = _.bind(this.onMessage, this);
      this.connection.onclose = _.bind(this.onClose, this);
   };

   _.extend(Game.prototype, {
      start: function() {
         console.log('starting a game, yeeeeehaw');
      },

      onOpen: function() {
         // connection is ready
      },

      onError: function(error) {
         console.log("JS Error: error");
      },

      onMessage: function(message) {
         var json = null;

         try {
            json = JSON.parse(message.data);
         } catch (e) {
            console.log('Failed to parse JSON: ', message.data);
            return;
         }

         console.log(json);
         if (json.type == "init_board") {
            console.log('trying to render...');
            this.board.setMap(json.board);
            this.render();
         }
      },

      onClose: function() {
         console.log('Socket is closing.');
      },

      render: function() {
         console.log('rendering...');
         render({
            cols: this.board.cols,
            rows: this.board.rows,
            map: this.board.map
         });
      }
   });

   return Game;
});
