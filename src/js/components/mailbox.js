app.component('mailbox', {
  templateUrl: 'templates/letters.tpl.html',
    controller: ['MailService', function(MailService) {
      var self = this;
      
      this.showLetter = function(letter) {
        self.selectedLetter = letter;
      };
      
      MailService.getLetters()
        .then(function(letters) {
          return self.letters = letters;
        });
    }]
});