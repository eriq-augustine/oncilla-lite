define(['underscore', 'renderable'], function(_, Renderable) {
   var Object = function(attributes) {
      this.class = attributes.class || 'default';
   };

   _.extend(Object.prototype, Renderable);

   return Object;
});
