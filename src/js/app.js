'use strict';
/**
 * Paths must be relative to the COMPILED .js file, but with compensation
 * to gh-pages structure: `domain/project/index.html`
 *
 * For now, building the components with rigger
 * 
 * !!!TODO: cope with minify/uglify issues!!!
 */

(function() {
  var app = angular.module('myMailApp', []);

//= services/MailService.js
//= components/mailbox.js
//= components/letter.js
//= components/clock.js

})();
