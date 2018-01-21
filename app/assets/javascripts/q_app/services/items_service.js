var app = angular.module('ngQApp.services');

app.service('ItemsService', ['$http', 'Item', 'ApiParams', 'ApiBaseService', function ($http, Item, ApiParams, ApiBaseService) {

  return  {
    getList: function (limit, offset, filter, order, context) {
      return ApiBaseService.getList(Item, '/items', limit, offset, filter, order, context)
    },

    getListAll: function (limit, offset, filter, order, context) {
      return ApiBaseService.getList(Item, '/items/index_all', limit, offset, filter, order, context)
    },

    search: function (limit, offset, filter, order, text) {
      return ApiBaseService.search(Item, '/items/search', limit, offset, filter, order, text)
    },

    create: function (item) {
      return $http.post( ApiParams.composeCreateURI('/items', item), {item:item} )
        .then(function (success_response) {
          return ApiParams.resultCreate(success_response);
        }, function (error_response) {
          return ApiParams.resultCreate(error_response);
        });
    },

    update: function (item) {
      return $http.put( ApiParams.composeUpdateURI('/items', item.id), {item:item} )
        .then(function (success_response) {
          return ApiParams.resultUpdate(success_response);
        }, function (error_response) {
          return ApiParams.resultUpdate(error_response);
        });
    },

    delete: function (id) {
      return $http.delete( ApiParams.composeDeleteURI('/items', id) )
        .then(function (success_response) {
          return ApiParams.resultDelete(success_response);
        }, function (error_response) {
          return ApiParams.resultDelete(error_response);
        });
    }

  }
}]);
