'use strict';

var tile = {};
exports.tile = tile;

var unit = require('./../../shared/js/unit.js').unit || unit;
var terrain = require('./../../shared/js/terrain.js').terrain || terrain;

tile.deserialize = function(data) {
   return new tile.Tile((data.unit ? unit.deserialize(data.unit) : null),
                        terrain.deserialize(data.terrain),
                        data.row,
                        data.col);
};

tile.Tile = function(unit, terrain, row, col) {
   this.unit = unit;
   this.terrain = terrain;
   this.row = row;
   this.col = col;
};

tile.Tile.prototype.serialize = function() {
   return {row: this.row,
           col: this.col,
           unit: (this.unit ? this.unit.serialize() : null),
           terrain: this.terrain.serialize()};
};

tile.Tile.prototype.getId = function() {
   return 'tile-' + this.row + '-' + this.col;
};

// Called when changing turns.
tile.Tile.prototype.refresh = function() {
   if (this.unit) {
      this.unit.refresh();
   }
};
