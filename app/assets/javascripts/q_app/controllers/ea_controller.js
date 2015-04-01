var app = angular.module('ngQApp.controllers');

app.controller('EAController', ['$scope', 'Category','CategoriesControllerService',
  function($scope, Category, CategoriesControllerService) {

    CategoriesControllerService.setup($scope);

    $scope.init = function(category) {
      $scope.setRoot(new Category(category));
    };

}]);
