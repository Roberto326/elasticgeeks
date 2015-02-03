var app = angular.module('ngQApp.services');

app.service('CategoriesControllerService', ['CategoriesService', function (CategoriesService) {

  return  {
    setup: function($scope) {

      $scope.NULL = {id:null, name:'Root'};
      $scope.EA   = {id:1, name:'Enterprise Applications'};
      $scope.PP   = {id:2, name:'Programming Platforms'};
      $scope.DT   = {id:3, name:'Development Tools'};

      $scope.current_parent = null;
      $scope.parents = [];
      $scope.categories = [];

      $scope.setRoot = function(category) {
        $scope.parents = [];
        $scope.setCurrentParent(category);
        $scope.loadCategories();
      };

      $scope.seeChildren = function(category) {
        $scope.setCurrentParent(category);
        $scope.loadCategories();
      };

      $scope.loadCategories = function() {
        CategoriesService.getList(null, null, null, null, $scope.current_parent.id).then(function (data) {
          $scope.categories = data.results;
        });
      };

      $scope.reload = $scope.loadCategories;

      $scope.setCurrentParent = function(category) {

        category = category == null ? {id:null, name:'Root'} : category;

        $scope.current_parent = category;

        var idx = $scope.parents.findIndex(function(item) {
          return item.id == category.id;
        });

        if (idx > -1) {
          $scope.parents = $scope.parents.slice(0, idx+1);
        } else {
          $scope.parents.push({id: category.id, name:category.name});
        }
      };
    }
  }
}]);