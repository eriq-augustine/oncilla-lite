define(function() {
   return function(baseClass) {
      console.log(baseClass);
      return {
         render: function() {
            var klass = this.klass || 'default',
                el = document.createElement('div');
            el.className = baseClass + ' ' + this.klass;
            return el;
         }
      }
   }
});
