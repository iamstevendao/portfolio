(function (angular) {
  'use strict';
  var App = angular.module('portfolio', ['smoothScroll']);
  var timer;

  App.controller('PortfolioController', function DataController($scope, $http) {
    var prjs, prjContainer, dots;
    angular.element(function () {
      dots = angular.element(document.getElementsByClassName("badge"));
      prjs = angular.element(document.getElementsByClassName("prj"));
      prjContainer = angular.element(document.getElementById("projects"));
      setTimeout(function () { $scope.setBackground(0, false); }, 1000);
    });

    //accounts
    $http.get('json/accounts.json')
      .then(function (res) {
        $scope.accounts = res.data;
      });

    //timeline
    $http.get('json/timeline.json')
      .then(function (res) {
        $scope.timeline = res.data;
      });

    //interest
    $http.get('json/interest.json')
      .then(function (res) {
        $scope.interests = res.data;
      });

    //projects
    $http.get('json/projects.json')
      .then(function (res) {
        $scope.projects = res.data;
      });


    $scope.setBackground = function (n, hover = true) {
      clearTimeout(timer);
      for (let i = 0; i < dots.length; i = i + 2) {
        set(i, false);
      }

      set(n * 2, true);
      $scope.current = $scope.interests[n].url;
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

    function set(i, highlight) {
      dots[i].style.backgroundColor = highlight ? "white" : "black";
      dots[i].style.color = highlight ? "black" : "#D4D4D4";
    }
  });
})(window.angular);