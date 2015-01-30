'use strict';

var dependencies = [
  'ngGrid',
  //'ng-rails-csrf',
  'ui.bootstrap',
  'templates',
  'ngSanitize',
  'ui.select2',
  'ngCookies',

  'ngQApp.models',
  'ngQApp.directives',
  'ngQApp.services',
  'ngQApp.controllers'
];

// declare modules
angular.module('ngQApp.models',      []);
angular.module('ngQApp.directives',  ['ngQApp.models']);
angular.module('ngQApp.services',    ['ngQApp.models']);
angular.module('ngQApp.controllers', ['ngQApp.models','ngQApp.services']);

var app = angular.module('ngQApp', dependencies);
