app.component('clock', {
  template: '<time>{{$ctrl.hours}}<i>:</i>{{$ctrl.minutes}}<i>:</i>{{$ctrl.seconds}}</time>',
  controller: function($interval) {
    $interval(function() {
      var seconds = new Date().getSeconds();
      var minutes = new Date().getMinutes();
      var hours = new Date().getHours();

      this.seconds = (seconds < 10 ? "0" : "") + seconds;
      this.minutes = (minutes < 10 ? "0" : "") + minutes;
      this.hours = (hours < 10 ? "0" : "") + hours;
    }.bind(this), 1000);
  }
});
