//= require application
//= require angular_application

describe('Service: CategoriesService', function() {

  var SampleSeqService, httpBackend;

  beforeEach(module('ngQApp'));

  beforeEach(inject(function($httpBackend, Category, ApiParams, _CategoryService_) {
    CategoryService = _CategoryService_;
    httpBackend = $httpBackend;
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it("should get some data", function() {

    var returnData = {'count':10, 'total':50, 'results':[{'id':1, 'name':'Joe'},{'id':2, 'name':'Doe'}], 'offset':0, 'limit':10};

    httpBackend.expectGET('/categories?').respond(returnData);

    CategoriesService.getSamples().then(function (response){
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