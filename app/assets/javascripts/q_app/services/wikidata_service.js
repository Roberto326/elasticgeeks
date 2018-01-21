var app = angular.module('ngQApp.services');

app.service('WikidataService', ['$http', function ($http) {

  var search_url = "https://www.wikidata.org/w/api.php?action=wbsearchentities&format=json&callback=JSON_CALLBACK&language=en&limit=30&search=";

  return  {
    searchEntities: function (search) {
      return $http({method:'JSONP', url:search_url+ encodeURIComponent(search)})
        .then(function (success_response) {
          var data = success_response.data;
          angular.forEach(data.search, function(item) {
            if (item.aliases) {
              var x = item.label;
              item.label = item.aliases[0];
              item.aliases[0] = x;
            }
          });
          return data;
        }, function (error_response) {
          return error_response;
        });
    }
  }
}]);