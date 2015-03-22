var app = angular.module('ngQApp.directives');

app.directive('qMarkdown', [function () {
    var converter = new Showdown.converter();

    function link2(scope, element, attrs) {

        function updateData(value) {
            if (value) {
                var htmlText = converter.makeHtml(value);
                element.html(htmlText);
            } else {
                element.html('');
            }
        }

        scope.$parent.$watch(attrs.data, function(value) {
            updateData(scope.data);
        });

        updateData(scope.data);
    }

    return {
        restrict: 'E',
        scope: {
            data: '='
        },
        link: link2
        //link: function (scope, element, attrs) {
        //    if (scope.data) {
        //        var htmlText = converter.makeHtml(scope.data);
        //        //var htmlText = converter.makeHtml(element.text());
        //        element.html(htmlText);
        //    }
        //}
    }
}]);
