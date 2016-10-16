'use strict';
/**
 * Paths must be relative to the COMPILED .js file, but with compensation
 * to gh-pages structure: `domain/project/index.html`
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

app.component('clock', {
  template: '<time>{{$ctrl.hours}}<i>:</i>{{$ctrl.minutes}}<i>:</i>{{$ctrl.seconds}}</time>',
  controller: function($interval) {
    $interval(function() {
      var seconds = new Date().getSeconds();
      var minutes = new Date().getMinutes();
      var hours = new Date().getHours();

      this.seconds = (seconds < 10 ? "0" : "") + seconds;
      this.minutes = (minutes < 10 ? "0" : "") + minutes;
      this.hours = (hours < 10 ? "0" : "") + hours;
    }.bind(this), 1000);
  }
});
