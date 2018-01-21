"use strict";

app.factory('Search', ['Category',

  function (Category) {

    function Search(json) {
      this.id               = json.id              || null;
      this.name             = json.name            || null;
      this.type             = json.type            || null;
      this.item_id          = json.item_id         || null;
      this.sub_category     = new Category({id:json.sub_category_id, name:json.sub_category_name, description:json.sub_category_description});
      this.base_category    = new Category({id:json.base_category_id, name:json.base_category_name, description:json.base_category_description});
    };

    Search.prototype = {
    };

    return Search;
  } ]);
