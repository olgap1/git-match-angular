'use strict';

/* App Module */

var gitMatchApp = angular.module('gitMatchApp', [
  'ngRoute',
  'gitMatchControllers',
  'gitMatchServices'
]);

gitMatchApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/compare', {
        templateUrl: 'partials/compare.html',
        controller: 'GitMatchCtrl'
      }).
      when('/detail/:username', {
        templateUrl: 'partials/detail.html',
        controller: 'DetailCtrl'
      }).
      otherwise({
        redirectTo: '/compare'
      });
  }]);
