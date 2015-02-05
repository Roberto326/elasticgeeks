var app = angular.module('ngQApp.controllers');

app.controller('AdminCategoriesController',
  ['$scope', '$templateCache', 'EditService', 'CategoriesService', 'ItemsService', 'CategoriesControllerService', 'PlatformsService', 'LicensesService',
  function($scope, $templateCache, EditService, CategoriesService, ItemsService, CategoriesControllerService, PlatformsService, LicensesService) {

    CategoriesControllerService.setup($scope);

    $scope.edit_category = EditService.init($scope, CategoriesService);
    $scope.edit_item     = EditService.init($scope, ItemsService);

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
