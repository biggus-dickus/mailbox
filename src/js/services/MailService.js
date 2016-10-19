app.service('MailService', function($http) {
  this.getLetters = function() {
    return $http.get('//test-api.javascript.ru/v1/maxm/letters', { cache: true }).
        then(
          function(response) {
            return response.data; //success
        },
          function(response) {
            console.log('Houston we\'ve got problems:' + response.status + ', ' + response.statusText);
          });
  }
});
