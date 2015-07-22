var app = angular.module('ngQApp.controllers');

app.controller('PPController', ['$scope', 'Category', 'CategoriesControllerService',
  function($scope, Category, CategoriesControllerService) {

    $scope.mainController = 'YES';

    CategoriesControllerService.setup($scope);

    $scope.init = function(root, category_1, category_2, category_3, div_id, showChart) {

      $scope.category_root = new Category(root);
      $scope.category_1    = new Category(category_1);
      $scope.category_2    = new Category(category_2);
      $scope.category_3    = new Category(category_3);

      $scope.setRoot($scope.category_root, $scope.category_1);

      $scope.div_id = div_id;
      if (showChart) {
        $scope.setShowChart(true);
      }
    };

}]);
