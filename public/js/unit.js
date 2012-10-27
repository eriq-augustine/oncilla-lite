define(['underscore', 'unit_constants', 'mixins/renderable'],
       function(_, unitConstants, Renderable) {
   var Object = function(attributes) {
      this.type = attributes.type;

      _.extend(this, attributes, unitConstants[this.type]);

      this.health = attributes.health || this.maxHealth;
      this.movePoints = attributes.movePoints || this.maxMovePoints;
      console.log(this);
   };

   _.extend(Object.prototype, Renderable({ baseClass: 'unit' }));

   return Object;
});
