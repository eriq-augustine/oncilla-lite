define(function() {
   return function(options) {
      return {
         render: function() {
            var klass = this.klass || 'default',
                el = document.createElement('div');
            el.className = options.baseClass + ' ' + this.klass;
            return el;
         }
      }
   }
});
