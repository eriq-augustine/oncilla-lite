'use strict';

var player = require('./../../shared/js/player.js').player;
// HACK(eriq): Re-export
exports.player = player;

// NOTE: We will NEVER serialize a socket (or connection id), therefore,
//  we will not need to provide serialization mechanisms for the ServerPlayer.

player.ServerPlayer = function(id, army, color, socket, connectionId) {
   player.Player(this, id, army, color);

   this.socket = socket,
   this.connectionId = connectionId;
};
player.serverPlayer.prototype = new player.Player();
player.serverPlayer.prototype.constructor = player.ServerPlayer;
