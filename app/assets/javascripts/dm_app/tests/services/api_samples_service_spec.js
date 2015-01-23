//= require application
//= require angular_application

describe('Service: ApiSamplesService', function() {

  var SampleSeqService, httpBackend;

  beforeEach(module('ngDMApp'));

  beforeEach(inject(function($httpBackend, Sample, Test, ApiParams, _ApiSamplesService_) {
    ApiSamplesService = _ApiSamplesService_;
    httpBackend = $httpBackend;
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it("should get some data", function() {

    var returnData = {'count':10, 'total':50, 'results':[{'id':1, 'name':'Joe'},{'id':2, 'name':'Doe'}], 'offset':0, 'limit':10};

    httpBackend.expectGET('/api/v1/samples?').respond(returnData);

    ApiSamplesService.getSamples().then(function (response){
      expect(response.paging.count).toBe(10);
      expect(response.paging.total).toBe(50);
      expect(response.paging.offset).toBe(0);
      expect(response.paging.limit).toBe(10);

      expect(response.results[0].id).toBe(1);
      expect(response.results[0].name).toBe('Joe');

      expect(response.results[1].id).toBe(2);
      expect(response.results[1].name).toBe('Doe');
    });

    httpBackend.flush();

  });


});