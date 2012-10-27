define(function() {
   var Weapon = function(attributes) {
      attributes = attributes || {};
      this.damage = attributes.damage || 0;
      this.name = attributes.name || 'pop gun';
   };

   return Weapon;
});
