// taken from http://weblogs.asp.net/dwahlin/archive/2013/09/18/building-an-angularjs-modal-service.aspx
var app = angular.module('ngDMApp.services');

app.service("ModalService", ['$modal', function($modal){

  var modalDefaults = {
    backdrop: true,
    keyboard: true,
    modalFade: false,
    windowClass: 'modal fade in',
    templateUrl: 'modal.html'
  };

  var modalOptions = {
    closeButtonText: 'Close',
    actionButtonText: 'OK',
    headerText: 'Confirm',
    bodyText: 'Perform this action?'
  };

  this.showModal = function (customModalDefaults, customModalOptions) {
    if (!customModalDefaults) customModalDefaults = {};
    return this.show(customModalDefaults, customModalOptions);
  };

  this.show = function (customModalDefaults, customModalOptions) {
    //Create temp objects to work with since we're in a singleton service
    var tempModalDefaults = {};
    var tempModalOptions = {};

    //Map angular-ui modal custom defaults to modal
    //defaults defined in service
    angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

    //Map modal.html.haml $scope custom properties to
    //defaults defined in service
    angular.extend(tempModalOptions, modalOptions, customModalOptions);

    if (!tempModalDefaults.controller) {
      tempModalDefaults.controller = ['$scope', '$modalInstance',
        function($scope, $modalInstance) {
          $scope.modalOptions = tempModalOptions;
          $scope.modalOptions.ok = function (result) {
            $modalInstance.close(result);
          };
          $scope.modalOptions.close = function (result) {
            $modalInstance.dismiss('cancel');
          };
        }];

    }

    return $modal.open(tempModalDefaults).result;
  };

}]);
