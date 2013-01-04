'use strict';

/**
 * This file should be included first on the client.
 */

// Define an exports object that is used in Node asset management, but not on the client.
var exports = {};

// Keep oncilla related data in here.
var oncilla = {};

// HACK(eriq): Make a require function so that files in shared can require like node.
function require(path, namespace) {
   return {};
}
