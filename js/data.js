(function (angular) {
  'use strict';
  var App = angular.module('data', []);

  App.controller('DataController', function DataController($scope, $http) {

    //timeline
    $http.get('json/timeline.json')
      .then(function (res) {
        $scope.timeline = res.data;
      });

    //projects
    $http.get('json/projects.json')
      .then(function (res) {
        $scope.projects = res.data;
      });

    //accounts
    $http.get('json/accounts.json')
      .then(function (res) {
        $scope.accounts = res.data;
      });
  });
})(window.angular);