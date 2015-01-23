//= require application
//= require angular_application

describe('Service: ApiGridService', function() {

  var ApiGridService, ApiReportDataService, $httpBackend, scope, $rootScope;

  beforeEach(module('ngDMApp'));

  beforeEach(inject(function(_$httpBackend_, _$rootScope_, _ApiGridService_, _ApiReportDataService_) {
    ApiGridService        = _ApiGridService_;
    ApiReportDataService  = _ApiReportDataService_;
    $httpBackend          = _$httpBackend_;
    $rootScope            = _$rootScope_;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it("get first page of data", function() {
    var returnData = {'count':2, 'total':2, 'offset':0, 'limit':25, 'results':[{'id':1, 'name':'Joe'},{'id':2, 'name':'Doe'}]};
    $httpBackend.expectGET('/api/v1/report_data?&limit=25').respond(returnData);

    scope = $rootScope.$new();
    ApiGridService.initialize(scope,'_test_grid_');
    scope.wait_time = 0;
    scope.gridOptions.$gridScope = $rootScope.$new();
    scope.getPagedDataAsync = ApiGridService.createGetPagedDataAsync(scope, ApiReportDataService);
    scope.getPagedDataAsync();

    $httpBackend.flush();

    expect(scope.totalServerItems).toBe(2);
    expect(scope.responseData.paging.count).toBe(2);
    expect(scope.responseData.paging.limit).toBe(25);
    expect(scope.responseData.paging.offset).toBe(0);
    expect(scope.responseData.paging.total).toBe(2);
    expect(scope.responseData.results.length).toBe(2);

    expect(scope.gridOptions.pagingOptions.currentPage).toBe(1);
    expect(scope.gridOptions.pagingOptions.pageSize).toBe(25);
  });


  it("get second page of data", function() {
    var returnData = {'count':3, 'total':10, 'offset':2, 'limit':3, 'results':[{'id':3, 'name':'Doe'},{'id':4, 'name':'Doe'},{'id':4, 'name':'Doe'}]};
    $httpBackend.expectGET('/api/v1/report_data?&limit=3&offset=3').respond(returnData);

    scope = $rootScope.$new();
    ApiGridService.initialize(scope,'_test_grid_');
    scope.wait_time = 0;
    scope.gridOptions.$gridScope = $rootScope.$new();
    scope.getPagedDataAsync = ApiGridService.createGetPagedDataAsync(scope, ApiReportDataService);

    // Set request options
    scope.pagingOptions.pageSize    = 3;
    scope.pagingOptions.currentPage = 2;

    scope.getPagedDataAsync();

    $httpBackend.flush();

    expect(scope.totalServerItems).toBe(10);
    expect(scope.responseData.paging.count).toBe(3);
    expect(scope.responseData.paging.limit).toBe(3);
    expect(scope.responseData.paging.offset).toBe(2);
    expect(scope.responseData.paging.total).toBe(10);
    expect(scope.responseData.results.length).toBe(3);

    expect(scope.gridOptions.pagingOptions.currentPage).toBe(2);
    expect(scope.gridOptions.pagingOptions.pageSize).toBe(3);
  });

});