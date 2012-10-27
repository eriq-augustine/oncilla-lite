define(['underscore', 'unit_constants', 'mixins/renderable'],
       function(_, unitConstants, Renderable) {
   var Object = function(attributes) {
      this.type = attributes.type;

      _.extend(this, attributes, unitConstants[this.type]);
      console.log(this);
   };

   _.extend(Object.prototype, Renderable({ baseClass: 'unit' }));

   return Object;
});
