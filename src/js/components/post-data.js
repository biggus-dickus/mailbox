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
