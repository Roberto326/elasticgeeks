var app = angular.module('ngQApp.services');

app.service('ApiParams', [  function(){

  var ApiParams = {

    composeGetListURI: function(basePath, limit, offset, filter, order, context) {
      var uri = basePath;
      if (basePath.indexOf('?') < 0) uri += '?';

      if (limit) {
        uri += '&limit='+limit;
      }

      if (offset) {
        uri += '&offset='+offset;
      }

      if (filter && !filter.isEmpty()) {
        uri += '&filter='+JSON.stringify(filter);
      }

      if (order && !order.isEmpty()) {
        uri += '&order='+JSON.stringify(order);
      }

      if (context) {
        uri += '&context='+context;
      }

      return encodeURI(uri);
    },

    composeSearchURI: function(basePath, limit, offset, filter, order, search) {
      var uri = basePath;
      if (basePath.indexOf('?') < 0) uri += '?';

      if (limit) {
        uri += '&limit='+limit;
      }

      if (offset) {
        uri += '&offset='+offset;
      }

      if (filter && !filter.isEmpty()) {
        uri += '&filter='+JSON.stringify(filter);
      }

      if (order && !order.isEmpty()) {
        uri += '&order='+JSON.stringify(order);
      }

      if (search) {
        uri += '&search='+encodeURIComponent(search);
      }

      return encodeURI(uri);
    },

    composeGetFacetsURI: function(basePath, filter, context) {
      var uri = basePath;
      if (basePath.indexOf('?') < 0) uri += '?';

      uri += '&limit=1&aggregation_count=0';

      if (filter && !filter.isEmpty()) {
        uri += '&filter='+JSON.stringify(filter);
      }

      if (context) {
        uri += '&context='+context;
      }

      return encodeURI(uri);
    },

    composeGetURI: function(basePath, id) {
      var uri = basePath + '/' + id;
      return encodeURI(uri);
    },

    composeCreateURI: function(basePath, model) {
      var uri = basePath;
      return encodeURI(uri);
    },

    composeUpdateURI: function(basePath, id) {
      var uri = basePath + '/' + id;
      return encodeURI(uri);
    },

    composeDeleteURI: function(basePath, id) {
      var uri = basePath + '/' + id;
      return encodeURI(uri);
    },

    resultGetList: function(response, data) {
      if (response.status == 200) {
        var paging = {
          count:  response.data.count,
          limit:  response.data.limit,
          offset: response.data.offset,
          total:  response.data.total
        };

        return {
          success: true,
          status: response.status,
          statusText: response.statusText,

          paging: paging,
          results: data,
          extra: response.data.extra
        }
      } else {

        return {
          success: false,
          status: response.status,
          statusText: response.statusText,

          paging: null,
          results: null
        }
      }
    },

    resultGetFacets: function(response) {
      if (response.status == 200) {
        return {
          success: true,
          status: response.status,
          statusText: response.statusText,

          result: response.data.aggregations,
          extra: response.data.extra
        }
      } else {

        return {
          success: false,
          status: response.status,
          statusText: response.statusText,

          result: null
        }
      }
    },

    resultGet: function(response, data) {
      if (response.status == 200) {
        return {
          success: true,
          status: response.status,
          statusText: response.statusText,

          result: data,
          extra: response.data.extra
        }
      } else {

        return {
          success: false,
          status: response.status,
          statusText: response.statusText,

          result: null
        }
      }
    },

    resultCreate: function(response) {
      if (response.status == 200) {
        return {
          success: true,
          status: response.status,
          statusText: response.statusText,
          uri: response.url,
          object: response.data
        }
      } else {
        return {
          success: false,
          status: response.status,
          statusText: response.statusText,
          uri: response.url,
          object: response.data.error
        }
      }
      return response;
    }

  };

  ApiParams.resultUpdate = ApiParams.resultCreate;
  ApiParams.resultDelete = ApiParams.resultCreate;

  return ApiParams;
}]);

