'use strict';

var player = {};
exports.player = player;

player.deserialize = function(data) {
   return new player.Player(data.id, data.army, data.color);
};

player.Player = function(id, army, color) {
   this.id = id;
   this.army = army;
   this.color = color;
};

player.Player.prototype.serialize = function() {
   return {id: this.id,
           army: this.army,
           color: this.color};
};
