(function() {
  var reporter = new jasmine.JUnitReporter({
    outputDir: 'spec/reports'
  });
  jasmine.getEnv().addReporter(reporter);
})();