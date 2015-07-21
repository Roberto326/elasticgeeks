var app = angular.module('ngQApp.services');

app.service('SearchesService', ['$http', 'Search', 'ApiParams', 'ApiBaseService', function ($http, Search, ApiParams, ApiBaseService) {

  return  {
    search: function (limit, offset, filter, order, text) {
      return ApiBaseService.search(Search, '/items/search', limit, offset, filter, order, text)
    }

  }
}]);
