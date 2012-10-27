require.config({
   paths: {
      'jquery': 'vendor/jquery-1.8.2.min',
      'underscore': 'vendor/underscore'
   }
});

require(['./game'], function(Game) {
   game = new Game();
   game.start();
});
