var app = angular.module('ngQApp.controllers');

app.controller('AdminItemsController',
  ['$scope', '$templateCache', '$timeout', 'EditService', 'CategoriesService', 'ItemsService', 'PlatformsService', 'LicensesService','WikidataService',
  function($scope, $templateCache, $timeout, EditService, CategoriesService, ItemsService, PlatformsService, LicensesService, WikidataService) {


    // Item
    $scope.edit_item     = EditService.init($scope, ItemsService);

    $scope.items        = [];
    $scope.wiki_results = [];
    var itemSearchTimer = null;

    $scope.reload = function() {
      ItemsService.getListAll(null, null, null, null, null).then(function (data) {
        $scope.items = data.results;
      });
    };


    $scope.$watch('edit_item.record.name', function (val) {
      if (itemSearchTimer) $timeout.cancel(itemSearchTimer);

      itemSearchTimer = $timeout(function() {
        WikidataService.searchEntities(val).then(function(data) {
          $scope.wiki_results = data.search;
        });
      }, 250); // delay 250 ms
    });

    $scope.edit_item.setWiki = function(id,label) {
      $scope.edit_item.record.wiki_id   = id;
      $scope.edit_item.record.wiki_name = label;
    };

    $scope.select2OptionsPlatform = {
      allowClear:true,
      multiple:true,
      query: function(options) {
        var filter = null;
        var sort   = [{field:'name',order:'ASC'}];

        if (options.term && options.term != '') {
          filter = [{field:'name', operation:'sw', value:options.term }];
        }

        PlatformsService.getList(100, options.page-1, filter, sort).then(
          function (response) {
            var result = {
              results: response.results || [],
              more: (response.paging.offset+response.paging.count) < response.paging.total,
              context: null
            };
            options.callback(result);
          }
        );
      }
    };

    $scope.select2OptionsLicense = {
      allowClear:true,
      multiple:true,
      query: function(options) {
        var filter = null;
        var sort   = [{field:'name',order:'ASC'}];

        if (options.term && options.term != '') {
          filter = [{field:'name', operation:'sw', value:options.term }];
        }

        LicensesService.getList(100, options.page-1, filter, sort).then(
          function (response) {
            var result = {
              results: response.results || [],
              more: (response.paging.offset+response.paging.count) < response.paging.total,
              context: null
            };
            options.callback(result);
          }
        );
      }
    };

    // Initialization
    $scope.reload();

}]);
