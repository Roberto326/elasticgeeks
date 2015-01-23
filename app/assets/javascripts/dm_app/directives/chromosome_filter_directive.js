var app = angular.module('ngDMApp.directives');

app.directive('ChromosomeFilterDirective', ['ReportData', function (ReportData) {

  return {
    restrict: 'AE',
    templateUrl: 'directives/chromosome_filter.html'
  }

}]);