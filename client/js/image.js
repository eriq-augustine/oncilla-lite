'use strict';

/**
 * Wrap images to support multiple types and sizes.
 * Also deal with sprite sheets.
 */

function Image(path) {
   path = path || 'assets/images/Default.png';
   this.path = path;
}

Image.prototype.apply = function(node) {
   node.style.background = 'url("' + this.path + '")';
};

function Sprite(spritesheet, positions) {
   this.spriteSize = 40;
   this.sheet = spritesheet;
   this.positions = positions;
   this.currentPosition = 0;
   this.freeze = false;
}

Sprite.prototype.apply = function(node) {
   node.style.background = this.getBackground();
};

Sprite.prototype.getBackground = function() {
   return 'transparent ' +
           'url(\'' + this.sheet + '\') ' +
           'no-repeat ' +
           '-' + this.spriteSize * this.positions[this.currentPosition][1] + 'px ' +
           '-' + this.spriteSize * this.positions[this.currentPosition][0] + 'px';
};

Sprite.prototype.toHtml = function() {
   return '<div class="sprite" ' +
          'style="background: ' + this.getBackground() + ';">' +
          '</div>';
}

// Advance to the next sprite image.
Sprite.prototype.next = function(node) {
   if (this.freeze || this.positions.length < 2) {
      return;
   }

   this.currentPosition = (this.currentPosition + 1) % this.positions.length;
   this.apply(node);
}
