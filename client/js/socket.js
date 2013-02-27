var socket = {};

socket.loadSocket = function() {
   var ws = new WebSocket("ws://localhost:9090");
   //var ws = new WebSocket("ws://76.126.186.239:9090");
   //var ws = new WebSocket("ws://24.176.224.131:9090");

   ws.onmessage = socket.onMessage;
   ws.onclose = socket.onClose;
   ws.onopen = socket.onOpen;
   ws.onerror = socket.onError;

   oncilla.socket = ws;
   oncilla.socketRequests = {};
   oncilla.socketRequestCounter = 0;
};

socket.onMessage = function(messageEvent) {
   // TODO(eriq): Error handle bad parse.
   var data = JSON.parse(messageEvent.data);

   console.log("Got Message: ");
   console.log(data);

   if (data.type == 'init_game') {
      oncilla.game = game.deserialize(data.game);
      util.initGameUI();
      util.loadInfoArea();
      oncilla.game.board.draw(document.getElementById('board-area'));

      // Add the sway.
      oncilla.swayTimer = setInterval(function() {
         oncilla.game.board.advanceSprites();
      }, 750);

      return;
   } else if (data.type == 'yourTurn') {
      oncilla.game.playersTurn(data.enemyMoves);
      return;
   }

   // TODO(eriq): Remove this when no validation occurs. Also remove the returns in the previous cases.
   if (data.hasOwnProperty('validationStatus')) {
      socket.validationResult(data);
   }
};

socket.onClose = function(messageEvent) {
   //console.log("Connection to server closed: " + JSON.stringify(messageEvent));
   util.fatalError("Connection to server closed.");
};

socket.onOpen = function(messageEvent) {
   //console.log("Connection to server opened: " + JSON.stringify(messageEvent));
   console.log("Connection to server opened.");
};

socket.onError = function(messageEvent) {
   console.log("Socket Error: " + JSON.stringify(messageEvent));
};

socket.sendToServer = function(object) {
   oncilla.socket.send(JSON.stringify(object));
};

// TODO(eriq): Better names (especially for the message key).
socket.validationResult = function(message) {
   var callback = oncilla.socketRequests[message.id].success;
   if (!message.validationStatus) {
      callback = oncilla.socketRequests[message.id].failure;
   }

   callback.call();

   delete oncilla.socketRequests[message.id];
};

socket.validate = function(type, data, successCallback, failureCallback) {
   var message = {type: type,
                  requestValidation: true,
                  data: data,
                  id: oncilla.socketRequestCounter};
   oncilla.socketRequests[oncilla.socketRequestCounter] = {success: successCallback, failure: failureCallback};
   oncilla.socketRequestCounter++;

   socket.sendToServer(message);
};

socket.serverValidateMove = function(startTile, endTile) {
   var message = {start: {row: startTile.row, col: startTile.col},
                  end: {row: endTile.row, col: endTile.col}};
   var success = oncilla.game.board.moveUnit.bind(oncilla.game.board, startTile, endTile);
   var failure = console.log.bind(console, 'Server rejected move.');
   socket.validate('move', message, success, failure);
};

socket.serverValidateAttack = function(playerTile, enemyTile) {
   var message = {player: {row: playerTile.row, col: playerTile.col},
                  enemy: {row: enemyTile.row, col: enemyTile.col}};
   var success = oncilla.game.board.attackUnit.bind(oncilla.game.board, playerTile, enemyTile);
   var failure = console.log.bind(console, 'Server rejected attack.');
   socket.validate('attack', message, success, failure);
};

socket.endTurn = function(moveset) {
   socket.sendToServer({type: 'endTurn',
                        moveset: moveset});
};
