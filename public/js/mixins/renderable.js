define(['jquery'], function($) {
   return function(options) {

      return {
         render: function() {
            var el = $('<div class="' +
                       options.baseClass + ' ' + this.className +
                       '">');

            if (this.health) {
               el.text = this.health;
            }

            return el[0];
         }
      }

   }
});
