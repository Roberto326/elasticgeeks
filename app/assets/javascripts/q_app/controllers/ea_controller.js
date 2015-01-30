var app = angular.module('ngQApp.controllers');

app.controller('EAController', ['$scope', 'CategoriesControllerService',
  function($scope, CategoriesControllerService) {

    CategoriesControllerService.setup($scope);

    $scope.setRoot($scope.EA);

}]);
