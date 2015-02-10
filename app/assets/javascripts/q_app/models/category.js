"use strict";

app.factory('Category', [

  function () {

    function Category(json) {
      this.id              = json.id           || null;
      this.name            = json.name         || null;
      this.fields_def      = json.fields_def   || null;
    };

    Category.prototype = {

      fieldsToText: function() {
        return JSON.stringify(this.fields_def);
      },

      textToFields: function(fields_def_text) {
        try {
          var obj = JSON.parse(fields_def_text);
          this.fields_def = obj;
          return true;
        } catch (e) {
          return false;
        }
      }
    };

    return Category;
  }
]);
