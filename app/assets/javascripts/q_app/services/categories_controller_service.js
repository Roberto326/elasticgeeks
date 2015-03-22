var app = angular.module('ngQApp.services');

app.service('CategoriesControllerService', ['CategoriesService','ItemsService', function (CategoriesService, ItemsService) {

  return  {
    setup: function($scope) {

      $scope.NULL = {id:null, name:'Root'};
      $scope.EA   = {id:1, name:'Enterprise Applications'};
      $scope.PP   = {id:2, name:'Programming Platforms'};
      $scope.DT   = {id:3, name:'Development Tools'};

      $scope.current_parent = null;
      $scope.parents = [];
      $scope.categories = [];
      $scope.categoriesIn3s = [];
      $scope.items = [];
      $scope.hasItems = false;
      $scope.showDescription = false;

      $scope.setRoot = function(category) {
        $scope.parents = [];
        $scope.setCurrentParent(category);
        $scope.reload();
      };

      $scope.seeChildren = function(category) {
        $scope.setCurrentParent(category);
        $scope.reload();
      };

      $scope.toggleShowDescription = function() {
        $scope.showDescription = !$scope.showDescription;
      };

      $scope.loadCategories = function() {
        CategoriesService.getList(null, null, null, null, $scope.current_parent.id).then(function (data) {
          $scope.categories     = data.results;
          $scope.categoriesIn3s = $scope.in3s(data.results);
        });
      };

      $scope.in3s = function(data) {
        var results = [];
        var row = [];
        results.push(row);

        var columnId = 0;
        angular.forEach(data, function(value) {
          row.push(value);
          columnId++;
          if (columnId == 3) {
            row = [];
            results.push(row);
            columnId = 0;
          }
        });
        return results;
      };

      $scope.loadItems = function() {
        ItemsService.getList(null, null, null, null, $scope.current_parent.id).then(function (data) {
          $scope.items = data.results;
          $scope.hasItems = !data.results.isEmpty();
        });
      };

      $scope.reload = function() {
        $scope.loadCategories();
        $scope.loadItems();
      };

      $scope.setCurrentParent = function(category) {

        category = category == null ? {id:null, name:'Root'} : category;

        $scope.current_parent = category;

        var idx = $scope.parents.findIndex(function(item) {
          return item.id == category.id;
        });

        if (idx > -1) {
          $scope.parents = $scope.parents.slice(0, idx+1);
        } else {
          //$scope.parents.push({id: category.id, name:category.name});
          $scope.parents.push(category);
        }
      };
    }
  }
}]);