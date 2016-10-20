app.service('MailService', function($http) {
  var service = {
    getLetters: function() {
      return $http.get('//test-api.javascript.ru/v1/maxm/letters', { cache: true }).
      then(
        function(response) {
          return response.data; //success
      },
        function(response) {
          console.log('Houston we\'ve got problems:' + response.status + ', ' + response.statusText);
        });
    },
    
    getLetter: function(id) {
      function letterMatchesParam(letter) {
        return letter._id === id;
      }
      
      return service.getLetters().then(function(letters) {
        return letters.find(letterMatchesParam);
      });
    }
  }
  
  return service;
});
