var app = angular.module('ngQApp.controllers');

app.controller('AdminCategoriesController', ['$scope', '$templateCache', 'EditService', 'CategoriesService', 'CategoriesControllerService',
  function($scope, $templateCache, EditService, CategoriesService, CategoriesControllerService) {

    CategoriesControllerService.setup($scope);

    $scope.edit = EditService.init($scope, CategoriesService);

}]);
