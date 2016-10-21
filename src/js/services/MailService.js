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
