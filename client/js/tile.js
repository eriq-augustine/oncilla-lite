'use strict';

tile.Tile.prototype.getTerrainElement = function() {
   return document.querySelector('#' + this.getId() + ' .terrain');
};

tile.Tile.prototype.getUnitElement = function() {
   return document.querySelector('#' + this.getId() + ' .unit');
};

//Tile.prototype.draw = function(container) {
tile.Tile.prototype.toHtml = function() {
   var html = '<div id="' + this.getId() + '" ' +
              'class="tile" data-row="' + this.row +
              '" data-col="' + this.col + '" ' +
              'onClick="oncilla.game.board.tileClicked(' + this.row + ', ' + this.col + ');">';

   html += this.terrain.toHtml();
   html += '<div class="terrain-overlay"></div>';

   if (this.unit) {
      html += this.unit.toHtml();
   }

   html += '<div class="tile-overlay"></div>';

   html += '</div>';

   return html;
}

// TODO(eriq): only changed modified portion.
tile.Tile.prototype.update = function(container) {
   return null;
}

// TODO(eriq): Keep DOM reference?
tile.Tile.prototype.advanceSprite = function() {
   this.terrain.sprite.next(this.getTerrainElement().querySelector('.sprite'));
   if (this.unit) {
      this.unit.sprite.next(this.getUnitElement().querySelector('.sprite'));
   }
};

tile.Tile.prototype.exhaustUnit = function() {
   if (!this.unit) {
      return;
   }

   this.unit.exhaust();
   // HACK(eriq): Instead of creating a new node and replacing the only one, I am just changing the class
   //  directly. This will break if more changes are made.
   document.querySelector('#' + this.getId() + ' .unit').classList.add('exhausted');
};

tile.Tile.prototype.attackHighlight = function() {
   document.querySelector('#' + this.getId() + ' .terrain-overlay').classList.add('attack-highlight');
};

tile.Tile.prototype.moveHighlight = function() {
   document.querySelector('#' + this.getId() + ' .terrain-overlay').classList.add('move-highlight');
};

tile.Tile.prototype.removeHighlight = function() {
   var tile = document.querySelector('#' + this.getId() + ' .terrain-overlay');
   tile.className = 'terrain-overlay';
};

tile.Tile.prototype.select = function() {
   document.querySelector('#' + this.getId() + ' .tile-overlay').classList.add('selected');

   //Clear old tabs
   util.clearExtraInfos();

   var activeTab = 'terrain';
   var tabs = util.createInfoTab('terrain', 'Terrain', false, false);
   var infos = this.terrain.createInfo();

   if (this.unit) {
      tabs += util.createInfoTab('unit', 'Unit', false, false);
      infos += this.unit.createUnitInfo();
      activeTab = 'unit';

      if (this.unit.canAction(oncilla.game.turn)) {
         tabs += util.createInfoTab('actions', 'Actions', false, false);
         infos += this.unit.createActionsInfo();
         activeTab = 'actions';
      }
   }

   document.querySelector('.info-area .tabs').innerHTML += tabs;
   document.querySelector('.info-area .infos').innerHTML += infos;
   util.selectInfo(activeTab);
};

tile.Tile.prototype.deselect = function() {
   var selectElement = document.querySelector('#' + this.getId() + ' .tile-overlay');
   selectElement.className = selectElement.className.replace(/\bselected\b/, '');
   util.clearExtraInfos();
};
