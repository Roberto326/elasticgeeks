var app = angular.module('ngQApp.services');

app.service('CategoriesService', ['$http', 'Category', 'ApiParams', 'ApiBaseService', function ($http, Category, ApiParams, ApiBaseService) {

  return  {
    getList: function (limit, offset, filter, order, context) {
      return ApiBaseService.getList(Category, '/categories', limit, offset, filter, order, context)
    },

    create: function (category) {
      return $http.post( ApiParams.composeCreateURI('/categories', category), category )
        .then(function (success_response) {
          return ApiParams.resultCreate(success_response);
        }, function (error_response) {
          return ApiParams.resultCreate(error_response);
        });
    },

    update: function (category) {
      return $http.put( ApiParams.composeUpdateURI('/categories', category.id), category )
        .then(function (success_response) {
          return ApiParams.resultUpdate(success_response);
        }, function (error_response) {
          return ApiParams.resultUpdate(error_response);
        });
    },

    delete: function (id) {
      return $http.delete( ApiParams.composeDeleteURI('/categories', id) )
        .then(function (success_response) {
          return ApiParams.resultDelete(success_response);
        }, function (error_response) {
          return ApiParams.resultDelete(error_response);
        });
    }

  }
}]);