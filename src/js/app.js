'use strict';
/**
 * Paths must be relative to the COMPILED .js file, but with compensation
 * to gh-pages structure: `domain/project/index.html`
 * 
 * !!!TODO: cope with minify/uglify issues!!!
 */

(function() {
  var app = angular.module('myMailApp', ['ui.router']);

  app.config(function($stateProvider) {
    $stateProvider.state({
      name: 'inbox',
      // url: '/inbox',
      url: '',
      template: '<mailbox />',
    });
    
    $stateProvider.state({
      name: 'sent',
      url: '/sent',
      template: '<sent />'
    });

    $stateProvider.state({
      name: 'spam',
      url: '/spam',
      template: '<spam />'
    });
    
    $stateProvider.state({
      name: 'address-book',
      url: 'address-book',
      template: '<address-book />'
    });
  });


/**
 * For now, building components with gulp-rigger
 */
//= services/MailService.js
//= components/clock.js
//= components/mailbox.js
//= components/letter.js
//= components/sent.js
//= components/spam.js
//= components/address-book.js

})();
