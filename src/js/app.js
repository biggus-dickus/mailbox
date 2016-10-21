'use strict';
/**
 * Paths must be relative to the COMPILED .js file, but with compensation
 * to gh-pages structure: `domain/project/index.html`
 * 
 * !!!TODO: cope with minify/uglify issues!!!
 */

(function() {
  var app = angular.module('myMailApp', ['ui.router']);

  
  /**
   * A collection of urls to fetch data from.
   * Use it as param for required MailService methods.
   * @type {Object}
   */
  var urls = {
    letters: '//test-api.javascript.ru/v1/maxm/letters',
    users: '//test-api.javascript.ru/v1/maxm/users'
  };

  app.config(function($stateProvider) {
    $stateProvider.state('inbox', {
      url: '/inbox',
      component: 'mailbox',
      resolve: {
        letters: function(MailService) {
          return MailService.getData(urls.letters);
        }
      }
    });

    $stateProvider.state('letter', {
      url: '/inbox/{letterId}', 
      component: 'letter',
      resolve: {
        letter: function(MailService, $transition$) {
          return MailService.getLetter($transition$.params().letterId);
        }
      }
    });
    
    $stateProvider.state('sent', {
      url: '/sent',
      component: 'sent'
    });

    $stateProvider.state('spam', {
      url: '/spam',
      component: 'spam'
    });
    
    $stateProvider.state('address-book', {
      url: 'address-book',
      component: 'addressBook',
      resolve: {
        users: function(MailService) {
          return MailService.getData(urls.users);
        }
      }
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

//= components/post-data.js

})();
