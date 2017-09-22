(function (angular) {
  'use strict';
  var App = angular.module('data', []);

  App.controller('DataController', function DataController($scope, $http) {
    $http.get('json/timeline.json')
      .then(function (res) {
        $scope.timeline = res.data;
      });
  });

})(window.angular);