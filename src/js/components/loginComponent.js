app.component('login', {
  templateUrl: 'templates/login.tpl.html',
  
  controller: function(AuthService, $state) {
    this.authenticate = function() {
      AuthService.authenticate(this.login, this.password);
      $state.go('inbox');
    };
  }
});
