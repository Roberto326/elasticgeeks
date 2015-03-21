var app = angular.module('ngQApp.directives');

app.directive('qMarkdown', [function () {
    var converter = new Showdown.converter();

    function link2(scope, element, attrs) {

        function updateData(value) {
            if (value) {
                var htmlText = converter.makeHtml(value);
                element.html(htmlText);
            }
        }

        window.console.log(attrs);
        scope.$watch(attrs.qMarkdown, function(value) {
            window.console.log('aa');
            updateData(value);
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
