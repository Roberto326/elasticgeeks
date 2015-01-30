var app = angular.module('ngQApp.services');

// Default implementations for ApiServices
app.service('ApiBaseService', ['$http', 'ApiParams', function($http, ApiParams){

    return {

      getList : function (Model, uri, limit, offset, filter, order, context) {
        return $http.get( ApiParams.composeGetListURI(uri, limit, offset, filter, order, context) )
          .then(function (success_response) {

            var data = [];
            angular.forEach(success_response.data.results, function (item) {
              data.push(new Model(item));
            });

            return ApiParams.resultGetList(success_response, data);
          }, function (error_response) {
            return ApiParams.resultGetList(error_response);
          });
      },

      getFacets : function (Model, uri, filter, context) {
        return $http.get( ApiParams.composeGetFacetsURI(uri, filter, context) )
          .then(function (success_response) {
            return ApiParams.resultGetFacets(success_response);
          }, function (error_response) {
            return ApiParams.resultGetList(error_response);
          });
      },

      get : function (Model, uri, id) {
        return $http.get( ApiParams.composeGetURI(uri, id) )
          .then(function (success_response) {
            return ApiParams.resultGet(success_response, new Model(success_response.data) );
          }, function (error_response) {
            return ApiParams.resultGet(error_response);
          });
      }


    }

  }
]);

