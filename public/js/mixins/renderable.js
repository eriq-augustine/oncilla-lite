define(function() {
   return function(options) {
      return {
         render: function() {
            var className = this.className || 'default',
                el = document.createElement('div');
            el.className = options.baseClass + ' ' + this.className;
            return el;
         }
      }
   }
});
