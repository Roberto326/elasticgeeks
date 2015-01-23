"use strict";

app.factory('Sample', [

  function () {

    function Sample(json) {
      this.id             = json.id           || null;
      this.name           = json.name         || null;
    }

    Sample.prototype = {
    };

    return Sample;
  } ]);
