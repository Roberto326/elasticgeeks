var app = angular.module('ngDMApp.services');

app.service('MapCacheService', [ function(){

  var store = {};

  function getMap(map_id) {
    if (!_.has(store, map_id)) {
      store[map_id] = {};
    }
    return store[map_id];
  }

  return {

    get: function(map_id, key) {
      return getMap(map_id)[key];
    },

    put: function(map_id, key, value) {
      getMap(map_id)[key] = value;
    },

    check: function(map_id, key, value) {
      var obj = this.get(map_id, key);
      if (obj) return obj;
      this.put(map_id, key, value);
      return value;
    }

  }

}]);

