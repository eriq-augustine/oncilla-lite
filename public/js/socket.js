function setUpSocket() {
   var port = 9090;
   var connection = new WebSocket('ws://127.0.0.1:' + port);
   window.connection = connection;

   connection.onopen = function() {
      // connection is ready
   };

   connection.onerror = function(error) {
      console.log("JS Error: error");
   };

   connection.onmessage = function(message) {
      var json = null;

      try {
         json = JSON.parse(message.data);

         if (json.type === 'init_board') {
            initBoard(json.boad);
         }

      } catch (e) {
         console.log('Failed to parse JSON: ', message.data);
         return;
      }
   };

   connection.onclose = function() {
      console.log('Socket is closing.');
   };
}
