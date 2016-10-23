app.service('AuthService', function() {
  var isAuthenticated;

  this.authenticate = function(login, password) {
    (login === 'bratishka' && password === '777') ? isAuthenticated = true : isAuthenticated = false;
  };

  this.isAuthenticated = function() {
    return isAuthenticated;
  }
});
