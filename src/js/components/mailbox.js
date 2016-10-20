app.component('mailbox', {
  bindings: { letters: '<' },
  templateUrl: 'templates/mailbox.tpl.html',
  
  controller: function() {
    var self = this;
    
    this.showLetter = function(letter) {
      self.selectedLetter = letter;
    };
  }
});
