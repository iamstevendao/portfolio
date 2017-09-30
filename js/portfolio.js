(function (angular) {
  'use strict';
  var App = angular.module('portfolio', ['smoothScroll']);
  var timer;

  const url = [
    "https://www.walldevil.com/wallpapers/w02/617977-evolution-naruto-chakra-mode-naruto-shippuden-running-sage-mode-uzumaki-naruto.jpg",
    'https://wallpaperscraft.com/image/liverpool_uefa_evrofinal_england_cup_27760_1920x1080.jpg',
    'https://i.ytimg.com/vi/FVFi9qwKmWk/maxresdefault.jpg',
    'https://i.ytimg.com/vi/Qd54ZrSkIw0/maxresdefault.jpg'
  ];
  App.controller('PortfolioController', function DataController($scope, $http) {
    // $scope.current = url[0];
    var dots = angular.element(document.getElementsByClassName("badge"));
    var prjs, prjContainer;
    angular.element(function () {
      $scope.setBackground(0, false);
      prjs = angular.element(document.getElementsByClassName("prj"));
      prjContainer = angular.element(document.getElementById("projects"));
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

    $scope.enter = function (index) {
      for (let i = 0; i < prjs.length; i++) {
        prjs[i].style.opacity = 0.2;
      }
      prjs[index].style.opacity = 1;
      prjs[index].style.backgroundColor = "#0B0B0B";
    }

    $scope.leave = function () {
      for (let i = 0; i < prjs.length; i++) {
        prjs[i].style.opacity = 1;
        prjs[i].style.backgroundColor = "transparent";
      }
    }

    function set(dot, highlight) {
      dot.style.backgroundColor = highlight ? "white" : "black";
      dot.style.color = highlight ? "black" : "#D4D4D4";
    }
  });
})(window.angular);