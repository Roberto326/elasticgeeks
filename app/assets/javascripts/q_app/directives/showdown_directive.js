var app = angular.module('ngQApp.directives');

app.directive('qMarkdown', [function () {
    var converter = new Showdown.converter();
    return {
        restrict: 'E',
        scope: {
            data: '='
        },
        link: function (scope, element, attrs) {
            var htmlText = converter.makeHtml(scope.data);
            //var htmlText = converter.makeHtml(element.text());
            element.html(htmlText);
        }
    }
}]);
