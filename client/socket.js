function setUpSocket() {
   var connection = new WebSocket('ws://127.0.0.1:1337');

   connection.onopen = function () {
      // connection is ready
   };

   connection.onerror = function (error) {
      console.log("JS Error: error");
   };

   connection.onmessage = function (message) {
      var json = null;

      try {
         json = JSON.parse(message.data);
      } catch (e) {
         console.log('Failed to parse JSON: ', message.data);
         return;
      }
   };
}
