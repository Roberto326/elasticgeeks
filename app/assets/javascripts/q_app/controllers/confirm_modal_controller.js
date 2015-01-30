var app = angular.module('ngQApp.controllers');

app.controller('ConfirmModalController', ['$scope','$modalInstance','messages',function ($scope, $modalInstance,messages) {
    $scope.messages = messages

    $scope.ok = function(data){
        $modalInstance.close({success: true, data:data});
    }

    $scope.cancel = function () {
        $modalInstance.close({success:false})
    };

}]);