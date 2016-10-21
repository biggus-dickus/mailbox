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
app.service('MailService', function($http) {
  
  var self = this;
  
  this.getData = function(url) {
    return $http.get(url, { cache: true })
    .then(
      function(response) {
        return response.data; //success
    },
      function(response) {
        console.log('Houston we\'ve got problems: ' + response.status + ', ' + response.statusText);
      });
  };

  this.getLetter = function(id) {
    function letterMatchesParam(letter) {
      return letter._id === id;
    }
    
    return self.getData(urls.letters).then(function(letters) {
      return letters.find(letterMatchesParam);
    });
  }
});
app.component('clock', {
  template: '<div class="clearfix">' +
              '<div class="clock">' +
                '<time>' +
                  '{{$ctrl.date | date:\'MMM d\'}}, ' +
                  '{{$ctrl.hours}}<i>:</i>{{$ctrl.minutes}}<i>:</i>{{$ctrl.seconds}}' +
                '</time>' +
              '</div>' +
            '</div>',
  
  controller: function($interval) {
    $interval(function() {
      var seconds = new Date().getSeconds();
      var minutes = new Date().getMinutes();
      var hours = new Date().getHours();

      this.date = new Date();
      this.seconds = (seconds < 10 ? "0" : "") + seconds;
      this.minutes = (minutes < 10 ? "0" : "") + minutes;
      this.hours = (hours < 10 ? "0" : "") + hours;
    }.bind(this), 1000);
  }
});
app.component('mailbox', {
  bindings: { letters: '<' },
  templateUrl: 'templates/mailbox.tpl.html'
});
app.component('letter', {
  bindings: { letter: '<'},
  templateUrl: 'templates/letter.tpl.html',
});
app.component('sent', {
  templateUrl: 'templates/sent.tpl.html',
});
app.component('spam', {
  templateUrl: 'templates/spam.tpl.html',
});
app.component('addressBook', {
  bindings: { users: '<' },
  templateUrl: 'templates/address-book.tpl.html'
});

/**
 * A plain and hastily-written service component,
 * used to post hard-coded data to server API from the browser
 * in one click of a button.
 */

app.component('postData', {
  template: '<button data-ng-click="$ctrl.post()">Click to send data to test API</button>',
  controller: function($http) {
    var self = this;

    this.letter = {
      mailbox: '57ff84133727f3110444cb18',
      subject: 'Увєдомленchen',
      body: 'Згідно з подстанввхен враз мати невиконданд всрік цей пунктъ рішення нах мати наданданд земільно ділянко підлягає скасуванданд на підставі ще право власнощеръ виникай з моменту мав мати заночданд реєстрацен в Єдиношер Уркскі реєстриш прав в нерухомишер майно та угодъ з нім. Ніяких дій нах мав оформландан правовстановлюшеръ документен Григ інн 13672 73897114 не справл, дозволу нах будівництво індивідуальнишеръ будинко він також не отримл (проектъ будинко не є мати дозволданд будівництво). Таким чин Григ інн 1367273897114 не є правовласник ні земельнишеръ ділянко, ні будівель, на відміну від еввнеръ папахен — Хруп інн 13299 73865192…',
      to: 'maxm@mail.xyz'
    },

    this.contact = {
        fullName: 'Конунг Сигурд Синяя Рожа',
        email: 'drakkar@death-to-england.se',
        avatarUrl: 'http://randomuser.me/api/portraits/thumb/men/28.jpg',
        birthdate: new Date(666, 5, 6),
        gender: 'M',
        address: 'Тронхейм'
    },

    this.post = function() {
      $http.post('//test-api.javascript.ru/v1/maxm/users', self.contact)
        .then(function() {
          console.log('Data was inserted successfully');
        },
        function(response) {
          console.log('Houston we\'ve got problems: ' + response.status + ', ' + response.statusText);
      });
    }
  }
});

})();