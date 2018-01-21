var app = angular.module('ngQApp.controllers');

app.controller('AdminLicensesController',
  ['$scope', '$templateCache', 'EditService', 'LicensesService',
  function($scope, $templateCache, EditService, LicensesService) {

    // license
    $scope.edit_license = EditService.init($scope, LicensesService);
    $scope.Licenses = [];

    $scope.loadLicenses = function() {
      LicensesService.getList(null, null, null, null).then(function (data) {
        $scope.Licenses   = data.results;
      });
    };

    $scope.reload = function() {
      $scope.loadLicenses();
    };

    $scope.loadLicenses();

}]);
