"use strict";

app.factory('Platform', [

  function () {

    function Platform(json) {
      this.id             = json.id           || null;
      this.name           = json.name         || null;
      this.text           = json.name         || null; // For Select2
    };

    Platform.prototype = {
    };

    return Platform;
  } ]);
