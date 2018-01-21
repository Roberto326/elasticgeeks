var app = angular.module('ngQApp.directives');

app.directive('ChromosomeFilterDirective', ['ReportData', function (ReportData) {

  return {
    restrict: 'AE',
    templateUrl: 'directives/chromosome_filter.html'
  }

}]);