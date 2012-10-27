define({
   render: function() {
      var klass = this.klass || 'default',
          el = '<div class="unit ' + this.klass + '"></div>';
      return document.createElement(el);
   }
});
