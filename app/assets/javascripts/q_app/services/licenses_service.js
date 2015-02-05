var app = angular.module('ngQApp.services');

app.service('LicensesService', ['$http', 'License', 'ApiParams', 'ApiBaseService', function ($http, License, ApiParams, ApiBaseService) {

  return  {
    getList: function (limit, offset, filter, order, context) {
      return ApiBaseService.getList(License, '/licenses', limit, offset, filter, order, context)
    },

    create: function (license) {
      return $http.post( ApiParams.composeCreateURI('/licenses', license), {license:license} )
        .then(function (success_response) {
          return ApiParams.resultCreate(success_response);
        }, function (error_response) {
          return ApiParams.resultCreate(error_response);
        });
    },

    update: function (license) {
      return $http.put( ApiParams.composeUpdateURI('/licenses', license.id), {license:license} )
        .then(function (success_response) {
          return ApiParams.resultUpdate(success_response);
        }, function (error_response) {
          return ApiParams.resultUpdate(error_response);
        });
    },

    delete: function (id) {
      return $http.delete( ApiParams.composeDeleteURI('/licenses', id) )
        .then(function (success_response) {
          return ApiParams.resultDelete(success_response);
        }, function (error_response) {
          return ApiParams.resultDelete(error_response);
        });
    }

  }
}]);