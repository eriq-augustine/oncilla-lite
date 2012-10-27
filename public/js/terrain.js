define(['underscore', 'mixins/renderable', 'terrain_constants'],
       function(_, Renderable, terrainConstants) {
   var Object = function(attributes) {
      this.type = attributes.type;
      _.extend(this, attributes, terrainConstants[this.type]);
   };

   _.extend(Object.prototype, Renderable({ baseClass: 'terrain' }));

   return Object;
});
