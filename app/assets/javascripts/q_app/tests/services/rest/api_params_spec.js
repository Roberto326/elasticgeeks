//= require application
//= require angular_application

describe('Lib: ApiParams', function() {

  var ApiParams;

  beforeEach(module('ngQApp'));

  beforeEach(inject(function(_ApiParams_) {
    ApiParams = _ApiParams_;
  }));

  it("creates well formed getList URI", function() {

    var uri = ApiParams.composeGetListURI('/base', 10, 33, [{"AND":0}], [{field:"name", order:"ASC"}], 123);
    uri = decodeURI(uri);

    uri_pieces = uri.split('&');

    expect(uri_pieces[0]).toBe('/base?');
    expect(uri_pieces[1]).toBe('limit=10');
    expect(uri_pieces[2]).toBe('offset=33');
    expect(uri_pieces[3]).toBe('filter=[{"AND":0}]');
    expect(uri_pieces[4]).toBe('order=[{"field":"name","order":"ASC"}]');
    expect(uri_pieces[5]).toBe('context=123');

  });

  it("creates well formed get URI", function() {

    var uri = ApiParams.composeGetURI('/base', 1);
    uri = decodeURI(uri);

    expect(uri).toBe('/base/1');
  });

  it("creates well formed create URI", function() {

    var uri = ApiParams.composeCreateURI('/base', {id:1, name:"Test"});
    uri = decodeURI(uri);

    expect(uri).toBe('/base');
  });

  it("creates well formed update URI", function() {

    var uri = ApiParams.composeUpdateURI('/base', 1);
    uri = decodeURI(uri);

    expect(uri).toBe('/base/1');
  });

  it("creates well formed delete URI", function() {

    var uri = ApiParams.composeDeleteURI('/base', 1);
    uri = decodeURI(uri);

    expect(uri).toBe('/base/1');
  });

  describe("creates well formed results for getList", function() {

    it("positive", function() {
      var response = {
        status:200,
        statusText:'OK',
        data:{
          count:1, limit:2, offset:3, total:4
        }
      };
      var data = [{id:1},{id:2}];

      var result = ApiParams.resultGetList(response, data);

      expect(result.success).toBe(true);
      expect(result.status).toBe(200);
      expect(result.statusText).toBe('OK');
      expect(result.paging).toEqual({count:1, limit:2, offset:3, total:4});
      expect(result.results).toEqual([{id:1},{id:2}]);
    });

    it("negative", function() {
      var response = {
        status:404,
        statusText:'Not Found',
        data:null
      };
      var data = [];

      var result = ApiParams.resultGetList(response, data);

      expect(result.success).toBe(false);
      expect(result.status).toBe(404);
      expect(result.statusText).toBe('Not Found');
      expect(result.paging).toEqual(null);
      expect(result.results).toEqual(null);
    });

  });

  describe("creates well formed results for create", function() {

    it("positive", function() {
      var response = {
        status:200,
        statusText:'OK',
        url:'/api/test',
        data:{id:1, name:'test'}
      };

      var result = ApiParams.resultCreate(response);

      expect(result.success).toBe(true);
      expect(result.status).toBe(200);
      expect(result.statusText).toBe('OK');
      expect(result.uri).toBe('/api/test');
      expect(result.object).toEqual({id:1, name:'test'});
    });

    it("negative", function() {
      var response = {
        status:404,
        statusText:'Not Found',
        url:'/api/test',
        data:{error:'Some Error'}
      };

      var result = ApiParams.resultCreate(response);

      expect(result.success).toBe(false);
      expect(result.status).toBe(404);
      expect(result.statusText).toBe('Not Found');
      expect(result.uri).toBe('/api/test');
      expect(result.object).toBe('Some Error');
    });

  });


});