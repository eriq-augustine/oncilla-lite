define({
   render: function() {
      var class = this.class || 'default',
          el = '<div class="unit ' + this.class + '"></div>';
      return document.createElement(el);
   }
});
