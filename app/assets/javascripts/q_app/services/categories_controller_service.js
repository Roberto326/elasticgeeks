var app = angular.module('ngQApp.services');

app.service('CategoriesControllerService', ['CategoriesService','ItemsService','SearchesService','$location','$anchorScroll', function (CategoriesService, ItemsService, SearchesService, $location, $anchorScroll) {

  return  {
    setup: function($scope) {

      $scope.NULL = {id:null, name:'Root'};
      $scope.EA   = {id:1, name:'Enterprise Applications'};
      $scope.PP   = {id:2, name:'Programming Platforms'};
      $scope.DT   = {id:3, name:'Development Tools'};

      $scope.div_id = null;

      $scope.current_parent = null;
      $scope.parents = [];
      $scope.categories = [];
      $scope.categoriesIn3s = [];
      $scope.items = [];
      $scope.hasItems = false;
      $scope.hasCategories = false;
      $scope.hasDescription = false;
      $scope.showDescription = false;
      $scope.showChart = false;
      $scope.searchText = '';
      $scope.searchResults = [];
      $scope.hasResults = false;
      $scope.tabExploreVisible = true;

      $scope.setRoot = function(root, category) {
        $scope.parents = [];
        $scope.setCurrentParent(root);
        $scope.setCurrentParent(category);
        $scope.reload();
      };

      $scope.seeChildren = function(category) {
        $scope.setCurrentParent(category);
        $scope.reload();
      };

      $scope.goSearch = function() {
        $scope.tabExploreVisible = false;
        $scope.$apply();
      };

      $scope.go1 = function() {
        $scope.setRoot($scope.category_root, $scope.category_1);
        $scope.tabExploreVisible = true;
        $scope.$apply();
      };

      $scope.go2 = function() {
        $scope.setRoot($scope.category_root, $scope.category_2);
        $scope.tabExploreVisible = true;
        $scope.$apply();
      };

      $scope.go3 = function() {
        $scope.setRoot($scope.category_root, $scope.category_3);
        $scope.tabExploreVisible = true;
        $scope.$apply();
      };

      $scope.search = function() {
        $scope.results = [];
        if ($scope.searchText) {
          SearchesService.search(null, null, null, null, $scope.searchText).then(function (data) {
            $scope.results = data.results;
            $scope.hasResults = !data.results.isEmpty();
          });
        };
      };

      $('#search_input').keyup(function(eventData){
        eventData.stopPropagation();
        console.log($scope.searchText);
        if (eventData.keyCode == 27) {
          $scope.searchText = '';
          $scope.$digest();
          $scope.search();
        } else if (eventData.keyCode == 13) {
          $scope.search();
        } else if ($scope.searchText == '') {
          $scope.search();
        }
      });

      $scope.showResult = function(category) {
        $scope.seeChildren(category);
        $scope.tabExploreVisible = true;

        location.hash = "#" + $scope.div_id;
      };

      $scope.toggleShowDescription = function() {
        $scope.showDescription = !$scope.showDescription;
      };

      $scope.setShowChart = function(value) {
        $scope.showChart = value;
        if (value) $scope.loadChart();
      };

      $scope.clearChart = function() {
        $('#'+$scope.div_id+"_chart").empty();
      };

      var chartOptions = function(){
        return {
          height:'600px',
          library: {
            curveType: 'function',
            fontName:'Lato',
            pointSize:0,
            vAxis: {
            title:'Wikipedia Page Views',
              logScale: false
            }
          }
        }
      };

      $scope.loadChart = function() {
        if ($scope.current_parent) {
          try {
            new Chartkick.LineChart($scope.div_id+"_chart", "/categories/"+$scope.current_parent.id+"/show_popularity", chartOptions());
          } catch (e) {};
        }
      };

      $scope.loadCategories = function() {
        $scope.categories = [];

        CategoriesService.getList(null, null, null, null, $scope.current_parent.id).then(function (data) {
          $scope.categories     = data.results;
          $scope.categoriesIn3s = $scope.in3s(data.results);
          $scope.hasCategories  = !data.results.isEmpty();
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
        $scope.items = [];
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
        $scope.hasDescription = category.description != '' && category.description != null;

        var idx = $scope.parents.findIndex(function(item) {
          return item.id == category.id;
        });

        if (idx > -1) {
          $scope.parents = $scope.parents.slice(0, idx+1);
        } else {
          //$scope.parents.push({id: category.id, name:category.name});
          $scope.parents.push(category);
        }

        $scope.clearChart();
        $scope.showChart = false;
      };
    }
  }
}]);
