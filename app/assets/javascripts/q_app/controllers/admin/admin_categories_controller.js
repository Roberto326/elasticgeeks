var app = angular.module('ngQApp.controllers');

app.controller('AdminCategoriesController',
  ['$scope', '$templateCache', '$timeout', 'EditService', 'CategoriesService', 'ItemsService', 'PlatformsService', 'LicensesService','WikidataService',
  function($scope, $templateCache, $timeout, EditService, CategoriesService, ItemsService, PlatformsService, LicensesService, WikidataService) {

    $scope.edit_category = EditService.init($scope, CategoriesService);
    $scope.edit_category.fields_def_text = '';
    $scope.edit_category.fields_def_ok   = true;

    $scope.categories = [];
    $scope.wiki_results = [];
    var categorySearchTimer = null;

    $scope.reload = function() {
      CategoriesService.getListAll(null, null, null, null, null).then(function (data) {
        $scope.categories = data.results;
      });
    };

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

    // Initialization
    $scope.reload();
}]);
