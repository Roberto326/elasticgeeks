var app = angular.module('ngQApp.controllers');

app.controller('DTController', ['$scope', 'CategoriesControllerService',
  function($scope, CategoriesControllerService) {

    CategoriesControllerService.setup($scope);

    $scope.setRoot($scope.DT);

}]);
