define(['underscore', 'mixins/renderable'], function(_, Renderable) {
   var Object = function(attributes) {
      this.klass = attributes.klass || 'default';
   };

   _.extend(Object.prototype, Renderable('terrain'));

   return Object;
});
