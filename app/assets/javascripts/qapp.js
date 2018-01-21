QAPP = {

  init: function() {
    this.setupCSRF();
    this.cats = [];
  },

  goSearch: function() {
    var scope = $('#dynamic_explorer').children().first().scope();
    scope.goSearch();
  },

  go1: function() {
    var scope = $('#dynamic_explorer').children().first().scope();
    scope.go1();
  },

  go2: function() {
    var scope = $('#dynamic_explorer').children().first().scope();
    scope.go2();
  },

  go3: function() {
    var scope = $('#dynamic_explorer').children().first().scope();
    scope.go3();
  },

  error: function(message) {
    this.alert(message);
  },

  notice: function(message) {
    this.flash(message, 'Warning');
  },

  alert: function(message) {
    this.flash(message, 'Error');
  },

  flash: function(message, title) {

    if ($('#qapp-alert').hasClass('loading')) {
      $('#qapp-alert .modal-body ul').append('<li><div class="h4">'+message+'</div></li>');

    } else {
      $('#qapp-alert').addClass('loading');
      $('#qapp-alert .modal-header strong').text(title);
      $('#qapp-alert .modal-body ul').empty();
      $('#qapp-alert .modal-body ul').append('<li><div class="h4">'+message+'</div></li>');

      $('#qapp-alert').on('hidden.bs.modal', function (e) {
        $('#qapp-alert').removeClass('loading');
      });
      $('#qapp-alert').modal();
    }
  },

  closeAlert: function() {
    $('#qapp-alert').modal('hide');
  },

  setupCSRF: function() {
    $.ajaxSetup({
      headers: {
        'X-CSRF-Token': this.getCookie('XSRF-TOKEN'),
        'X-XSRF-Token': this.getCookie('XSRF-TOKEN')
      }
    });
  },

  queryParameter: function (name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  },

  loadInPlace: function(placeholder, url, wait) {
    if (typeof wait === 'undefined') wait = 10;

    if (wait >= 0) {
      $(placeholder).empty();
      $(placeholder).append('<div class="waiting"></div>');
    } else if (wait < 0) {
      wait = 0;
    }

    setTimeout(function() {

      $.ajax({
        url:url,
        method: 'GET',
        success: function(data) {
          if (data) {
            $(placeholder).empty();
            $(placeholder).append(data);
          }
        }
      });

    }, wait);
  }

};


