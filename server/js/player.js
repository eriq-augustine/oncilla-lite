'use strict';

var player = require('./../../shared/js/player.js').player;
// HACK(eriq): Re-export
exports.player = player;

// NOTE: We will NEVER serialize a Connection, therefore,
//  we will NOT need to provide serialization mechanisms for the ServerPlayer.

player.ServerPlayer = function(id, army, color, conn) {
   player.Player(this, id, army, color);

   this.conn = conn;
};
player.ServerPlayer.prototype = new player.Player();
player.ServerPlayer.prototype.constructor = player.ServerPlayer;
