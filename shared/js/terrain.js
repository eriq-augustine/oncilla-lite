'use strict';

var terrain = {};
exports.terrain = terrain;

terrain.types = {};

terrain.getTerrain = function(name) {
   return new terrain.types[name]();
};

terrain.addType = function(data) {
   terrain.types[data.type] = function() {
      return new terrain.Terrain(data.type, data.spritePath,
                                 data.spritePositions,
                                 data.movecost, data.defense);
   };
};

terrain.deserialize = function(data) {
   return terrain.getTerrain(data.type);
};

terrain.Terrain = function(type, spritePath, spritePositions,
                           movecost, defense) {
   this.type = type;
   this.spritePath = spritePath;
   this.spritePositions = spritePositions;
   this.movecost = movecost;
   this.defense = defense;
}

terrain.Terrain.prototype.serialize = function() {
   return {type: this.type};
};
