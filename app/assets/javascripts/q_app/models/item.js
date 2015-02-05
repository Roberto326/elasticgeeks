"use strict";

app.factory('Item', [

  function () {

    function Item(json) {
      this.id             = json.id           || null;
      this.name           = json.name         || null;
      this.website        = json.website      || null;
      this.platforms      = json.platforms    || null;
      this.licenses       = json.licenses     || null;

      // For display in the grid
      this.platform_names = this.platforms.map(function(item) {return item.text}).join(', ');
      this.license_names  = this.licenses.map (function(item) {return item.text}).join(', ');

    };

    Item.prototype = {
    };

    return Item;
  } ]);
