"use strict";

app.factory('Search', ['Category',

  function (Category) {

    function Search(json) {
      this.id               = json.id              || null;
      this.name             = json.name            || null;
      this.type             = json.type            || null;
      this.item_id          = json.item_id         || null;
      this.category_1       = new Category({id:json.category_1_id, name:json.category_1_name, description:json.category_1_description});
      this.category_2       = new Category({id:json.category_2_id, name:json.category_2_name, description:json.category_2_description});
    };

    Search.prototype = {
    };

    return Search;
  } ]);
