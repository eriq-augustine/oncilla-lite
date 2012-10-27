define({
   render: function() {
      var klass = this.klass || 'default',
          el = '<div class="unit ' + this.klass + '"></div>';
      console.log(klass);
      return document.createElement(el);
   }
});
