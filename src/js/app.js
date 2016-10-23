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

    $stateProvider.state('home', {
      url: '',
      component: 'home'
    })
    .state('inbox', {
      parent: 'home',
      url: '/inbox',
      component: 'inbox',
      resolve: {
        letters: function(MailService) {
          return MailService.getData(urls.letters);
        }
      }
    })
    .state('letter', {
      parent: 'home',
      url: '/inbox/{letterId}', 
      component: 'letter',
      resolve: {
        letter: function(MailService, $transition$) {
          return MailService.getLetter($transition$.params().letterId);
        }
      }
    })
    .state('sent', {
      parent: 'home',
      url: '/sent',
      component: 'sent'
    })
    .state('spam', {
      parent: 'home',
      url: '/spam',
      component: 'spam'
    })
    .state('address-book', {
      parent: 'home',
      url: '/address-book',
      component: 'addressBook',
      resolve: {
        users: function(MailService) {
          return MailService.getData(urls.users);
        }
      }
    })
    .state('login', {
      url: '/login',
      component: 'login'
    });

  });

  app.run(function ($transitions, AuthService) {
    $transitions.onEnter({
      to: '**'
    }, function ($transition$, $state$) {
        if ($state$.name !== 'login' && !AuthService.isAuthenticated()) {
          return $transition$.router.stateService.target('login');
        }
    });
});


/**
 * For now, building components with gulp-rigger,
 * Webpack will be integrated as soon as I grasp it.
 */
//= services/MailService.js
//= services/AuthService.js

//= components/loginComponent.js
//= components/clockComponent.js
//= components/homeComponent.js
//= components/inboxComponent.js
//= components/letterComponent.js
//= components/sentComponent.js
//= components/spamComponent.js
//= components/addressBookComponent.js

//= components/postDataComponent.js

})();
