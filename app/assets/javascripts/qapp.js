QAPP = {

  init: function() {
    this.setupCSRF();
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
  }

};

