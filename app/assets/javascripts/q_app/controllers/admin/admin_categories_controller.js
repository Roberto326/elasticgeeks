var app = angular.module('ngQApp.controllers');

app.controller('AdminCategoriesController',
  ['$scope', '$templateCache', '$timeout', 'EditService', 'CategoriesService', 'ItemsService', 'CategoriesControllerService', 'PlatformsService', 'LicensesService','WikidataService',
  function($scope, $templateCache, $timeout, EditService, CategoriesService, ItemsService, CategoriesControllerService, PlatformsService, LicensesService, WikidataService) {

    CategoriesControllerService.setup($scope);

    // Category
    $scope.edit_category = EditService.init($scope, CategoriesService);
    $scope.edit_category.fields_def_text = '';
    $scope.edit_category.fields_def_ok   = true;

    $scope.wiki_results = [];
    var categorySearchTimer = null;
    var itemSearchTimer = null;

    $scope.edit_category.beforeEdit = function(record){
      $scope.edit_category.fields_def_text = record.fieldsToText();
    };

    $scope.edit_category.registerCallback('beforeEdit', $scope.edit_category, 'beforeEdit');

    $scope.$watch('edit_category.record.name', function (val) {
      if (categorySearchTimer) $timeout.cancel(categorySearchTimer);

      categorySearchTimer = $timeout(function() {
        WikidataService.searchEntities(val).then(function(data) {
          $scope.wiki_results = data.search;
        });
      }, 250); // delay 250 ms
    });

    $scope.edit_category.setWiki = function(id,label) {
      $scope.edit_category.record.wiki_id   = id;
      $scope.edit_category.record.wiki_name = label;
    };

    // Item
    $scope.edit_item     = EditService.init($scope, ItemsService);

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


}]);
