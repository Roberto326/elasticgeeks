"use strict";

app.factory('Item', [

  function () {

    function Item(json) {
      this.id             = json.id           || null;
      this.name           = json.name         || null;
      this.description    = json.description  || null;
      this.website        = json.website      || null;
      this.platforms      = json.platforms    || null;
      this.licenses       = json.licenses     || null;
      this.fields         = json.fields       || null;
      this.wiki_id        = json.wiki_id      || null;
      this.wiki_name      = json.wiki_name    || null;
      this.trend          = json.trend        || null;
      this.rank           = json.rank         || null;
      this.rank_year      = json.rank_year    || null;

      // For display in the grid
      this.platform_names = this.platforms.map(function(item) {return item.text}).join(', ');
      this.license_names  = this.licenses.map (function(item) {return item.text}).join(', ');

    };

    Item.prototype = {
    };

    return Item;
  } ]);
