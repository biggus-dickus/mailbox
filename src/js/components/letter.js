app.component('letter', {
  bindings: {
    letter: '=',
  },
  templateUrl: 'templates/letter.tpl.html',
  controller: function() {
    this.goBack = function() {
      return this.letter = null;
    }.bind(this);
  }
});
