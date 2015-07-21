var app = angular.module('ngQApp.controllers');

app.controller('PPController', ['$scope', 'Category', 'CategoriesControllerService',
  function($scope, Category, CategoriesControllerService) {

    $scope.mainController = 'YES';

    CategoriesControllerService.setup($scope);

    $scope.init = function(root, category, div_id, showChart) {
      $scope.setRoot(new Category(root), new Category(category));
      $scope.div_id = div_id;
      if (showChart) {
        $scope.setShowChart(true);
      }
    };

}]);
