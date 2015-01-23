//= require application
//= require angular_application

describe('Javascript', function() {

  describe('Model: Sample', function() {

    var Sample;

    beforeEach(module('ngDMApp'));

    beforeEach(inject(function(_Sample_) {
      Sample = _Sample_;
    }));

    it("can be instantiated", function() {
      expect(Sample).not.toBe(null);
    });

    it("can get assigned from json", function() {
      var json = {
        id:1, 
        name:'Dude'
      };

      var sample = new Sample(json);

      expect(sample.id).toBe(1);
      expect(sample.name).toBe('Dude');
    });

    it("expands phenotypes collection", function() {
      var json = {
        id:1,
        name:'Dude',
        phenotypes:[{id:1, text:'blue eyes'},{id:2, text:'brown eyes'}]
      };

      var sample = new Sample(json);

      expect(sample.phenotype_names).toBe('blue eyes, brown eyes');
    });


  });

});