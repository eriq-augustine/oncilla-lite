'use strict';

// HACK(eriq): Overide so that we create a ClientUnit and not a Unit.
unit.addType = function(data) {
   unit.types[data.type + '-' + data.army + '-' + data.color] = function() {
      return new unit.ClientUnit(data.type, data.army, data.color,
                                 data.spritePath, data.spritePositions,
                                 data.attack, data.range, data.moveType, data.move);
   }
};

unit.ClientUnit = function(type, army, color,
                           spritePath, spritePositions,
                           attack, range, moveType, move) {
   unit.Unit.call(this, type, army, color, spritePath, spritePositions,
                  attack, range, moveType, move);

   this.sprite = new Sprite(spritePath, spritePositions);
};
unit.ClientUnit.prototype = new unit.Unit();
unit.ClientUnit.prototype.constructor = unit.ClientUnit;

unit.ClientUnit.prototype.exhaust = function() {
   unit.Unit.prototype.exhaust.call(this);

   this.sprite.freeze = true;
};

unit.ClientUnit.prototype.refresh = function() {
   unit.Unit.prototype.refresh.call(this);

   this.sprite.freeze = false;
};

unit.ClientUnit.prototype.toHtml = function() {
   var classes = 'unit';
   if (this.exhausted) {
      classes += ' exhausted';
   }

   return '<div class="' + classes + '">' +
          this.sprite.toHtml() +
          '<div class="health-overlay"><p>' + this.hp + '</p></div>' +
          '</div>';
};

// TODO(eriq): Full info and actions
unit.ClientUnit.prototype.createUnitInfo = function() {
   return '<div id="info-unit" class="info extra-info">' +
           '<div>' + this.type + '</div>' +
           '<div>Unit Pic</div>' +
           '<div>HP: ' + this.hp + ' / 100</div>' +
           '<div>Armor Type</div>' +
           '<div>Armor Number</div>' +
           '<div>Move Amount</div>' +
           '<div>Movement Type</div>' +
           '<div>Weapon 1</div>' +
           '<div>? Weapon 2</div>' +
          '</div>';
};

// TODO(eriq): Full info and actions
// TODO(eriq): The enemies in range should be cached and reused somewhere.
unit.ClientUnit.prototype.createActionsInfo = function() {
   var attackButton = '<button onclick="oncilla.game.board.enterAttackMode();">Attack</button>';
   if (this.exhausted) {
      attackButton = '<button disabled="disabled">Attack</button>';
   } else if (oncilla.game.board.getEnemiesInSelectionsRange().length == 0) {
      attackButton = '<button disabled="disabled">Attack (No Enemies In Range)</button>';
   }

   var moveButton = (this.hasMoved || this.exhausted) ?
                    '<button disabled="disabled">Move</button>' :
                    '<button onclick="oncilla.game.board.enterMoveMode();">Move</button>';

   return '<div id="info-actions" class="info extra-info">' +
           moveButton +
           attackButton +
           '<div>Something Cool</div>' +
           '<div>Capture</div>' +
           '<button onclick="oncilla.game.board.exhaustUnit();">Wait</button>' +
          '</div>';
};
