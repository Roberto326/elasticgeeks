var app = angular.module('ngQApp.controllers');

app.controller('AdminPlatformsController',
  ['$scope', '$templateCache', 'EditService', 'PlatformsService',
  function($scope, $templateCache, EditService, PlatformsService) {

    // platform
    $scope.edit_platform = EditService.init($scope, PlatformsService);
    $scope.platforms = [];

    $scope.loadPlatforms = function() {
      PlatformsService.getList(null, null, null, null).then(function (data) {
        $scope.platforms   = data.results;
      });
    };

    $scope.reload = function() {
      $scope.loadPlatforms();
    };

    $scope.loadPlatforms();

}]);
