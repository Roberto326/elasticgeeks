var app = angular.module('ngQApp.controllers');

app.controller('DTController', ['$scope', 'Category', 'CategoriesControllerService',
  function($scope, Category, CategoriesControllerService) {

    CategoriesControllerService.setup($scope);

    $scope.init = function(category, div_id) {
      $scope.setRoot(new Category(category));
      console.log($scope.div_id);
      $scope.div_id = div_id;
      console.log($scope.div_id);
    };

}]);
