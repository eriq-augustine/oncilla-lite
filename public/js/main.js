require.config({
   paths: {
      'underscore': 'vendor/underscore'
   }
});

require(['./game'], function(Game) {
   game = new Game();
   game.start();
});
