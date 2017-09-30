(function (angular) {
  'use strict';
  var App = angular.module('portfolio', ['smoothScroll']);
  var timer;

  const url = [
    "http://www.the-fanboy-perspective.com/uploads/1/7/3/8/17382151/rgfesdgfes_orig.jpg",
    'https://wallpaperscraft.com/image/liverpool_uefa_evrofinal_england_cup_27760_1920x1080.jpg',
    'http://wallpapersdota2.com/wp-content/uploads/2015/02/wallpapersdota2.com-699.jpg',
    'http://stuffpoint.com/dragonball-z-anime/image/114886-dragonball-z-anime-goku-wallpaper.jpg'
  ];
  App.controller('PortfolioController', function DataController($scope, $http) {
    // $scope.current = url[0];

    angular.element(function () {
      $scope.setBackground(0);
    });

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

    $scope.setBackground = function (n) {
      clearTimeout(timer);

      $scope.current = url[n];
      $scope.$apply();
      console.log("im here", n);
      timer = setTimeout(function () {
        $scope.setBackground(n == 8 / 2 - 1 ? 0 : ++n);
        console.log("im inside");
      }, 2000);
    }

  });
})(window.angular);