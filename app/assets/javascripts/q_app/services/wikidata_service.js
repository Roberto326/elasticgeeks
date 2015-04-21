var app = angular.module('ngQApp.services');

app.service('WikidataService', ['$http', function ($http) {

  var search_url = "https://www.wikidata.org/w/api.php?action=wbsearchentities&format=json&callback=JSON_CALLBACK&language=en&search=";

  return  {
    searchEntities: function (search) {
      return $http({method:'JSONP', url:search_url+search})
        .then(function (success_response) {
          return success_response.data;
        }, function (error_response) {
          console.log('FAILED')
          console.log(error_response);
          return error_response;
        });
    }
  }
}]);