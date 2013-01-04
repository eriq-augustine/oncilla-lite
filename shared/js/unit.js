'use strict';

var unit = {};
exports.unit = unit;

unit.types = {};

unit.deserialize = function(data) {
   var newUnit = unit.getStockUnit(data.type, data.army, data.color);

   newUnit.player = data.player;
   newUnit.hasMoved = data.hasMoved;
   newUnit.exhausted = data.exhausted;
   newUnit.hp = data.hp;

   return newUnit;
};

unit.getStockUnit = function(type, army, color) {
   return unit.types[type + '-' + army + '-' + color]();
};

unit.addType = function(data) {
   unit.types[data.type + '-' + data.army + '-' + data.color] = function() {
      return new unit.Unit(data.type, data.army, data.color,
                           data.spritePath, data.spritePositions,
                           data.attack, data.range, data.moveType, data.move);
   };
};

// TODO(eriq): All ranges should be a range. [minimum range, maximum range)
// TODO(eriq): Weapons instead of attack.
// TODO(eriq): Armor and armor types.
unit.Unit = function(type, army, color,
                     spritePath, spritePositions,
                     attack, range, moveType, move) {
   // Properties that are the same for all units of this type.
   this.type = type;
   this.army = army;
   this.color = color;
   this.spritePath = spritePath;
   this.spritePositions = spritePositions;
   this.attack = attack;
   this.range = range;
   this.moveType = moveType;
   this.move = move;

   // Properties that need to be decided on a unit by unit basis.
   this.player = 0;
   this.hasMoved = false;
   this.exhausted = false;
   this.hp = 100;
};

// Serialize this unit to an object which can be used to resurect the unit using deserialize().
unit.Unit.prototype.serialize = function() {
   return {type: this.type,
           army: this.army,
           color: this.color,
           player: this.player,
           hasMoved: this.hasMoved,
           exhausted: this.exhausted,
           hp: this.hp};
};

unit.Unit.prototype.canMove = function(movingPlayer) {
   return !this.exhausted &&
          !this.hasMoved &&
          this.player == movingPlayer;
};

unit.Unit.prototype.canAction = function(movingPlayer) {
   return !this.exhausted &&
          this.player == movingPlayer;
};

unit.Unit.prototype.exhaust = function() {
   this.hasMoved = true;
   this.exhausted = true;
};

unit.Unit.prototype.refresh = function() {
   this.hasMoved = false;
   this.exhausted = false;
};

unit.Unit.prototype.moved = function() {
   this.hasMoved = true;
};
