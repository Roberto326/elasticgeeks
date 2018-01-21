var app = angular.module('ngQApp.services');

app.service('ModalService',['$modal',function($modal){
  this.confirm = function(messages){
    modalInstance = $modal.open({
      templateUrl: 'confirm_modal.html',
      controller: 'ConfirmModalController',
      size: 'lg',
      resolve:{
        messages: function(){
          return messages;
        }
      }
    }).result;
    return modalInstance;
  };

  this.show_code = function(messages){
    modalInstance = $modal.open({
      templateUrl: 'show_code_modal.html',
      controller: 'ConfirmModalController',
      size: 'lg',
      resolve:{
        messages: function(){
          return messages;
        }
      }
    }).result;
    return modalInstance;
  }

}]);