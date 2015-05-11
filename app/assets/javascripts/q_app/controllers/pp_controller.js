var app = angular.module('ngQApp.controllers');

app.controller('PPController', ['$scope', 'Category', 'CategoriesControllerService',
  function($scope, Category, CategoriesControllerService) {

    CategoriesControllerService.setup($scope);

    $scope.init = function(category, div_id, showChart) {
      $scope.setRoot(new Category(category));
      $scope.div_id = div_id;
      if (showChart) {
        $scope.setShowChart(true);
      }
    };

}]);
