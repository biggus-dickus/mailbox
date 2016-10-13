'use strict';
/**
 * Paths must be relative to the COMPILED .js file, but with compensation to
 * gh-pages structure: `domain/project/index.html`
 *
 * !!!TODO: cope with minify/uglify issues!!!
 */

var app = angular.module('myMailApp', []);

app.service('MailService', function($http) {
  this.getLetters = function() {
    return $http.get('//test-api.javascript.ru/v1/maxm/letters').
        then(
          function(response) {
            return response.data; //success
        },
          function(response) {
            console.log('Houston we\'ve got problems:' + response.status + ', ' + response.statusText);
          });
  }
});

app.component('mailbox', {
  templateUrl: 'templates/letters.tpl.html',
    controller: ['MailService', function(MailService) {
      var self = this;
      MailService.getLetters()
        .then(function(letters) {
          return self.letters = letters;
        });
    }]
});
