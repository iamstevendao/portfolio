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
    var dots = angular.element(document.getElementsByClassName("badge"));
    console.log(dots.length);

    angular.element(function () {
      $scope.setBackground(0, false);
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

    $scope.setBackground = function (n, hover = true) {
      clearTimeout(timer);
      for (let i = 0; i < dots.length; i = i + 2) {
        set(dots[i], false);
      }

      set(dots[n * 2], true);
      $scope.current = url[n];
      if (!hover)
        $scope.$apply();

      timer = setTimeout(function () {
        $scope.setBackground(n == dots.length / 2 - 1 ? 0 : ++n, false);
      }, 2000);
    };
    function set(dot, highlight) {
      dot.style.backgroundColor = highlight ? "white" : "black";
      dot.style.color = highlight ? "black" : "#D4D4D4";
    }
  });
})(window.angular);