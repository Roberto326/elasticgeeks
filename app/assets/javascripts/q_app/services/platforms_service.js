var app = angular.module('ngQApp.services');

app.service('PlatformsService', ['$http', 'Platform', 'ApiParams', 'ApiBaseService', function ($http, Platform, ApiParams, ApiBaseService) {

  return  {
    getList: function (limit, offset, filter, order, context) {
      return ApiBaseService.getList(Platform, '/platforms', limit, offset, filter, order, context)
    },

    create: function (platform) {
      return $http.post( ApiParams.composeCreateURI('/platforms', platform), {platform:platform} )
        .then(function (success_response) {
          return ApiParams.resultCreate(success_response);
        }, function (error_response) {
          return ApiParams.resultCreate(error_response);
        });
    },

    update: function (platform) {
      return $http.put( ApiParams.composeUpdateURI('/platforms', platform.id), {platform:platform} )
        .then(function (success_response) {
          return ApiParams.resultUpdate(success_response);
        }, function (error_response) {
          return ApiParams.resultUpdate(error_response);
        });
    },

    delete: function (id) {
      return $http.delete( ApiParams.composeDeleteURI('/platforms', id) )
        .then(function (success_response) {
          return ApiParams.resultDelete(success_response);
        }, function (error_response) {
          return ApiParams.resultDelete(error_response);
        });
    }

  }
}]);