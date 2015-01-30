var app = angular.module('ngQApp.services');

app.service('ApiGridService', [ '$cookieStore','$templateCache', function($cookieStore, $templateCache) {

  return {

    initialize: function (parent_scope, grid_id) {

      parent_scope.grid_id = grid_id;
      parent_scope.totalServerItems = 0;
      parent_scope.grid_filter = null;
      parent_scope.wait_time = 10;

      parent_scope.pagingOptions = {
        pageSizes: [5, 25, 50, 250, 500, 1000],
        pageSize: 25,
        currentPage: 1
      };

      // Set paging fields after data is received from service
      parent_scope.setPagingData = function (data) {
        parent_scope.responseData = data;
        if (data.results) {
          parent_scope.gridData = data.results;
          parent_scope.totalServerItems = data.paging.total;

          // If offset got reset on server side, update it on the client side as well
          if (data.paging.offset == 0) parent_scope.pagingOptions.currentPage = 1;
        } else {
          parent_scope.gridData = [];
          parent_scope.totalServerItems = 0;
        }
        parent_scope.currentMaxPages = Math.ceil(parent_scope.totalServerItems / parent_scope.pagingOptions.pageSize);
        if (!parent_scope.$$phase) {
          parent_scope.$apply();
        }

        if (parent_scope.onGridDataLoaded) parent_scope.onGridDataLoaded(parent_scope.gridData);
      };

      // Clear grid data
      parent_scope.clearData = function () {
        parent_scope.gridData = [];
        parent_scope.totalServerItems = 0;

        if (!parent_scope.$$phase) {
          parent_scope.$apply();
        }
      };

      // Monitors paging Options to request new page
      parent_scope.$watch('pagingOptions', function (newVal, oldVal) {
        if (newVal.pageSize !== oldVal.pageSize) {
          if (newVal.currentPage > 1) {
            var pos = oldVal.currentPage * oldVal.pageSize;
            newVal.currentPage = Math.floor(pos / newVal.pageSize);
          }
        }

        if (newVal !== oldVal) {
          if (newVal.currentPage === 0) newVal.currentPage = 1;
          parent_scope.getPagedDataAsync(null, null, false);
        }
      }, true);

      // Monitors sort options to request new data
      parent_scope.$watch('gridOptions.ngGrid.config.sortInfo', function (newVal, oldVal) {
        if (parent_scope.gridOptions.useExternalSorting && (newVal !== oldVal)) {
          parent_scope.getPagedDataAsync();
        }
      }, true);

      parent_scope.grid_preferences = {

        loaded: false,

        init: function() {
          var that = this;
          that.load();

          parent_scope.gridScope().$watchCollection('renderedColumns', function(newValue,oldValue) {
            that.save();
          })
        },

        save: function() {
          $cookieStore.put(parent_scope.grid_id+'_columns', this.getVisibleColumns());
        },

        load: function() {
          var visibleHash = $cookieStore.get(parent_scope.grid_id+'_columns');
          this.setVisibleColumns(visibleHash);
        },

        getVisibleColumns: function() {
          var visibleHash = {};
          angular.forEach(parent_scope.gridScope().columns, function(value) {
            visibleHash[value.field] = value.visible;
          });
          return visibleHash;
        },

        setVisibleColumns: function(visibleHash) {
          if (!visibleHash) return;
          angular.forEach(parent_scope.gridScope().columns, function(value) {
            if (_.has(visibleHash,value.field)) {
              value.visible = visibleHash[value.field];
            }
          });
          if (!parent_scope.gridScope().$$phase) {
            parent_scope.gridScope().$apply();
          }
        }

      },

      // Sets defaults for grid control
      parent_scope.gridOptions = {
        data: 'gridData',
        columnDefs: [],

        multiSelect: false,
        keepLastSelected: false,
        plugins: [new ngGridFlexibleHeightPlugin()],

        selectWithCheckboxOnly: false,
        showSelectionCheckbox: false,
        showColumnMenu: true,
        showFooter: true,
        showGroupPanel: false,

        enableHighlighting: true,
        enablePaging: true,
        enableColumnResize: true,
        enableColumnReordering: true,

        totalServerItems: 'totalServerItems',
        pagingOptions: parent_scope.pagingOptions,
        filterOptions: {filterText: '', useExternalFilter: true},
        useExternalSorting: true,

        rowTemplate: 'row_template.html',
        footerTemplate: 'footer_template.html'

      };

      parent_scope.setGridColumns = function(columnDefs) {
        _.each(columnDefs, function(item) {
          if (item.cellTemplateName) {
            item.cellTemplate = $templateCache.get(item.cellTemplateName);
          }
        });
        parent_scope.gridOptions['columnDefs'] = columnDefs;
      };

      parent_scope.gridScope = function() {
        return parent_scope.gridOptions.$gridScope;
      };

      parent_scope.setLoading = function(value) {
        parent_scope.gridScope().loadingData = value;
        if (!parent_scope.gridScope().$$phase) {
          parent_scope.gridScope().$apply();
        }
      };

      parent_scope.$on('ngGridEventData', function() {
        if (!parent_scope.grid_preferences.loaded) {
          parent_scope.grid_preferences.loaded = true;
          parent_scope.grid_preferences.load();
          parent_scope.grid_preferences.init();
        }
      });

    },


    // Create custom method to request data from service
    createGetPagedDataAsync : function (parent_scope, data_service, context) {
      return function () {
        var func = function () {

          var page      = parent_scope.pagingOptions.currentPage;
          var pageSize  = parent_scope.pagingOptions.pageSize;

          if (parent_scope.gridOptions.enablePaging) {
            if (pageSize < 0) pageSize = 25;
            if (page < 0) page = 1;
          } else {
            page = 1;
            pageSize = 5000;
          }

          var limit = pageSize;
          var offset = (page - 1) * pageSize;

          // Sorting
          var order     = [];
          if (parent_scope.gridOptions.ngGrid && parent_scope.gridOptions.ngGrid.config) {
            var sortInfo  = parent_scope.gridOptions.ngGrid.config.sortInfo;
            for (var i = 0; i < sortInfo.fields.length; i++) {
              order.push({field: sortInfo.fields[i], order: sortInfo.directions[i]});
            }
          }

          parent_scope.setLoading(true);

          data_service.getGridData(limit, offset, parent_scope.grid_filter, order, context).then(function (data) {
            parent_scope.setLoading(false);
            parent_scope.setPagingData(data);
          });

          // Reset selected Items
          if (parent_scope.gridOptions.selectAll) parent_scope.gridOptions.selectAll(false);

        };
        if (parent_scope.wait_time > 0)
          setTimeout(func, parent_scope.wait_time);
        else
          func();
      }
    }

  };

}]);

