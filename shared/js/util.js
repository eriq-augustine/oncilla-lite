'use strict';

var util = {};
exports.util = util;

var unit = require('./../../shared/js/unit.js').unit || unit;
var terrain = require('./../../shared/js/terrain.js').terrain || terrain;

util.loadStockUnits = function() {
   util.stockUnitTypes.forEach(function(type) {
      unit.addType(type);
   });
};

util.loadStockTerrains = function() {
   util.stockTerrainTypes.forEach(function(type) {
      terrain.addType(type);
   });
};

util.stockUnitTypes = [{type: 'clown',
                        army: 'circus',
                        color: 'red',
                        spritePath: 'assets/units/circus.png',
                        spritePositions: [[0, 0], [1, 0]],
                        attack: 1,
                        range: 1,
                        moveType: 'infantry',
                        move: 2},
                       {type: 'clown',
                        army: 'circus',
                        color: 'blue',
                        spritePath: 'assets/units/circus.png',
                        spritePositions: [[0, 2], [1, 2]],
                        attack: 1,
                        range: 1,
                        moveType: 'infantry',
                        move: 2},
                       {type: 'infantry',
                        army: 'advance-wars',
                        color: 'red',
                        spritePath: 'assets/units/orangeStar.png',
                        spritePositions: [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0]],
                        attack: 1,
                        range: 1,
                        moveType: 'infantry',
                        move: 4}];

util.stockTerrainTypes = [{type: 'plains',
                           spritePath: 'assets/terrain/terrain.png',
                           spritePositions: [[1, 0]],
                           movecost: 1,
                           defense: 2},
                          {type: 'mountains',
                           spritePath: 'assets/terrain/terrain.png',
                           spritePositions: [[0, 1]],
                           movecost: 2,
                           defense: 4}];
