'use strict';

var dependencies = [
  'ngGrid',
  //'ng-rails-csrf',
  'ui.bootstrap',
  'templates',
  'ngSanitize',
  'ui.select2',
  'ngCookies',

  'ngDMApp.models',
  'ngDMApp.directives',
  'ngDMApp.services',
  'ngDMApp.controllers'
];

// declare modules
angular.module('ngDMApp.models',      []);
angular.module('ngDMApp.directives',  ['ngDMApp.models']);
angular.module('ngDMApp.services',    ['ngDMApp.models']);
angular.module('ngDMApp.controllers', ['ngDMApp.models','ngDMApp.services']);

var app = angular.module('ngDMApp', dependencies);
