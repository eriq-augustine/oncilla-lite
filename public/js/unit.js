define(['underscore', 'mixins/renderable'], function(_, Renderable) {
   var Object = function(attributes) {
      attributes = attributes || {};
      this.klass = attributes.klass || 'default';
      this.movePoints = attributes.movePoints || 5;
   };

   _.extend(Object.prototype, Renderable({ baseClass: 'unit' }));

   return Object;
});
