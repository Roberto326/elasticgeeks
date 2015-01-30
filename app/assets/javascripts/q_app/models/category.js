"use strict";

app.factory('Category', [

  function () {

    function Category(json) {
      this.id             = json.id           || null;
      this.name           = json.name         || null;
    };

    Category.prototype = {
    };

    return Category;
  } ]);
