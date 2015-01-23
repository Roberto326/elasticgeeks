var app = angular.module('ngDMApp.services');

app.service('ApiSamplesService', ['$http', 'Sample', 'Test', 'ApiParams', 'ApiBaseService', function ($http, Sample, Test, ApiParams, ApiBaseService) {

  return  {
    getSamples: function (limit, offset, filter, order) {
      return ApiBaseService.getList(Sample, '/api/v1/samples', limit, offset, filter, order)
    },

    getGridData: function (limit, offset, filter, order) {
      return $http.get( ApiParams.composeGetListURI('/api/v1/samples/data', limit, offset, filter, null) )
        .then(function (success_response) {

          var data = [];
          angular.forEach(success_response.data.results, function (item) {

            if (item.tests.length == 0) {
              // Sample without test
              data.push( new Test({sample_id:item.id, sample:new Sample(item)}) );
            } else {
              angular.forEach(item.tests, function(test) {
                var test = new Test(test);
                test.sample = new Sample(item);

                data.push(test);
              });
            }

            //data.push(new Sample(item));
          });

          return ApiParams.resultGetList(success_response, data);

        }, function (error_response) {
          return ApiParams.resultGetList(error_response);
        });
    },

    createSample: function (sample) {
      return $http.post( ApiParams.composeCreateURI('/api/v1/samples', sample), sample )
        .then(function (success_response) {
          return ApiParams.resultCreate(success_response);
        }, function (error_response) {
          return ApiParams.resultCreate(error_response);
        });
    },

    updateSample: function (sample) {
      return $http.put( ApiParams.composeUpdateURI('/api/v1/samples', sample.id), sample )
        .then(function (success_response) {
          return ApiParams.resultUpdate(success_response);
        }, function (error_response) {
          return ApiParams.resultUpdate(error_response);
        });
    },

    deleteSample: function (id) {
      return $http.delete( ApiParams.composeDeleteURI('/api/v1/samples', id) )
        .then(function (success_response) {
          return ApiParams.resultDelete(success_response);
        }, function (error_response) {
          return ApiParams.resultDelete(error_response);
        });
    }

  }
}]);