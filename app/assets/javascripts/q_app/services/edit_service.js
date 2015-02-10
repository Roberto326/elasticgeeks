var app = angular.module('ngQApp.services');

app.service('EditService', ['ModalService', function (ModalService) {

  var EditClass = function(parentScope, CrudService) {

    var that = this;
    this.record = {};
    this.editing = false;
    this.operation = 'edit';
    this.callbacks = new dpm.Callbacks();

    this.edit = function(record) {
      this.record = angular.copy(record);
      this.callbacks.fireCallback('beforeEdit',this.record);
      this.editing = true;
    };

    this.new = function(record) {
      this.record = record ? angular.copy(record) : {};
      this.callbacks.fireCallback('beforeNew', this.record);
      this.editing = true;
    };

    this.save = function() {
      this.callbacks.fireCallback('beforeSave', this.record);
      var func = this.record.id ? CrudService.update : CrudService.create;
      func(this.record).then(function (result) {
        if (result.success) {
          that.callbacks.fireCallback('afterSave', this.record, true);
          that.editing = false;
          parentScope.reload();
        } else {
          that.callbacks.fireCallback('afterSave', this.record, false);
          alert(result.statusText);
        }
      });
    };

    this.cancel = function() {
      this.editing = false;
    };

    this.delete = function(record) {
      ModalService.confirm(['Delete "'+record.name+'"?']).then(function(res){
        if(res.success) {
          CrudService.delete(record.id).then(function (result){
            if (result.success) {
              parentScope.reload();
            } else {
              alert(result.statusText);
            }
          });
        }
      });
    };

    this.registerCallback = function(trigger, instance, method) {
      this.callbacks.addCallback(trigger, instance, method);
    };

  };


  return {

    init: function(parentScope, CrudService) {

      return new EditClass(parentScope, CrudService);

    }
  }

}]);