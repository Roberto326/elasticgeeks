"use strict";

app.factory('License', [

  function () {

    function License(json) {
      this.id             = json.id           || null;
      this.name           = json.name         || null;
      this.text           = json.name         || null; // For Select2
    };

    License.prototype = {
    };

    return License;
  } ]);
