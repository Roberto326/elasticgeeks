//= require application
//= require angular_application

describe('Javascript', function() {

  describe('Model: Category', function() {

    var Category;

    beforeEach(module('ngQApp'));

    beforeEach(inject(function(_Category_) {
      Category = _Category_;
    }));

    it("can be instantiated", function() {
      expect(Category).not.toBe(null);
    });

    it("can get assigned from json", function() {
      var json = {
        id:1, 
        name:'Dude'
      };

      var category = new Category(json);

      expect(category.id).toBe(1);
      expect(category.name).toBe('Dude');
    });

  });

});