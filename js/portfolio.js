(function (angular) {
  'use strict'
  var App = angular.module('portfolio', ['smoothScroll', 'data'])

  App.controller('PortfolioController', ['dataController', '$scope', '$document', function PortfolioController (dataController, $scope, $http, $document) {
    var prjs, dots, prjContainer
    var timer

    // retrieve data
    dataController.request().then(function (res) {
      initializeComponents(res)
    })

    // interest and project effects

    angular.element(function () {
      $scope.setBackground(0, false)
    })

    $scope.setBackground = function (n, hover = true) {
      clearTimeout(timer)
      for (let i = 0; i < dots.length; i = i + 2) { set(i, false) }

      set(n * 2, true)
      $scope.bgInterest = $scope.interests[n].url
      if (!hover) { $scope.$apply() }

      timer = setTimeout(function () {
        $scope.setBackground(n === dots.length / 2 - 1 ? 0 : ++n, false)
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

    function initializeComponents (res) {
      // get data only from the response and pass to initializeData
      initializeData(res.map((value) => (value.data)))

      initializeElements()

      startBackground()
    }

    function startBackground () {
      $scope.setBackground(0, false)
    }

    function initializeData (data) {
      $scope.accounts = data[0]
      $scope.timeline = data[1]
      $scope.interests = data[2]
      $scope.projects = data[3]
    }

    function initializeElements () {
      dots = angular.element(document.querySelector('.badge'))
      console.log(dots)
      prjs = angular.element(document.getElementsByClassName('prj'))
      prjContainer = angular.element(document.getElementById('projects'))
    }
  }])
})(window.angular)
