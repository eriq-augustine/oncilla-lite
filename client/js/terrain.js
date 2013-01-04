'use strict';

// HACK(eriq): Override this to make a ClientTerrain and not a Terrain.
terrain.addType = function(data) {
   terrain.types[data.type] = function() {
      return new terrain.ClientTerrain(data.type, data.spritePath,
                                       data.spritePositions,
                                       data.movecost, data.defense);
   };
};

terrain.ClientTerrain = function(type, spritePath, spritePositions,
                                 movecost, defense) {
   terrain.Terrain.call(this, type, spritePath, spritePositions,
                        movecost, defense);
   this.sprite = new Sprite(this.spritePath, this.spritePositions);
}
terrain.ClientTerrain.prototype = new terrain.Terrain();
terrain.ClientTerrain.prototype.constructor = terrain.Terrain;

terrain.ClientTerrain.prototype.toHtml = function() {
   return '<div class="terrain">' +
          this.sprite.toHtml() +
          '</div>';
};

terrain.ClientTerrain.prototype.createInfo = function() {
   return '<div id="info-terrain" class="info extra-info">' +
           '<div>Terrain Name</div>' +
           '<div>Terrain Pic</div>' +
           '<div>Terrain Type</div>' +
           '<div>Defense Bonus</div>' +
           '<div>Move Cost Matrix</div>' +
          '</div>';
};
