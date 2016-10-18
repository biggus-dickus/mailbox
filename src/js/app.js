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
    $stateProvider.state('inbox', {
      // url: '/inbox',
      url: '',
      template: '<mailbox />'
    });
    $stateProvider.state('sent', {
      url: '/sent',
      template: '<sent />'
    });
    $stateProvider.state('spam', {
      url: '/spam',
      template: '<spam />'
    });
    $stateProvider.state('address-book', {
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
