(function (angular) {
  'use strict'
  var App = angular.module('portfolio', ['smoothScroll', 'data'])
  var timer

  App.controller('PortfolioController', ['dataController', '$scope', function PortfolioController (dataController, $scope, $http) {
    dataController.request().then(function (res) {
      $scope.accounts = res[0].data
      $scope.timeline = res[1].data
      $scope.interests = res[2].data
      $scope.projects = res[3].data
    })

    // interest and project effects
    var prjs, prjContainer, dots
    angular.element(function () {
      dots = angular.element(document.getElementsByClassName('badge'))
      prjs = angular.element(document.getElementsByClassName('prj'))
      prjContainer = angular.element(document.getElementById('projects'))
      $scope.setBackground(0, false)
    })

    $scope.setBackground = function (n, hover = true) {
      clearTimeout(timer)
      for (let i = 0; i < dots.length; i = i + 2) { set(i, false) }

      set(n * 2, true)
      $scope.bgInterest = $scope.interests[n].url
      if (!hover) { $scope.$apply() }

      timer = setTimeout(function () {
        $scope.setBackground(n == dots.length / 2 - 1 ? 0 : ++n, false)
      }, 3000)
    }

    // mouse enter the project name
    $scope.enter = function (index) {
      blurAll()
      $scope.bgProject = $scope.projects[index].image
      prjs[index].style.opacity = 1
      prjs[index].style.backgroundColor = '#0B0B0B'
    }

    // mouse leave the project name
    $scope.leave = function () {
      $scope.bgProject = 'none'
      blurAll(false)
    }

    function blurAll (blur = true) {
      for (let i = 0; i < prjs.length; i++) {
        prjs[i].style.backgroundColor = 'transparent'
        prjs[i].style.opacity = blur ? 0.2 : 1
      }
    }

    function set (i, highlight) {
      dots[i].style.backgroundColor = highlight ? 'white' : 'black'
      dots[i].style.color = highlight ? 'black' : '#D4D4D4'
    }
  }])
})(window.angular)
