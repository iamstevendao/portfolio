(function (angular) {
  'use strict'
  var App = angular.module('portfolio', ['smoothScroll', 'data'])

  App.controller('PortfolioController', ['dataController', '$scope', function PortfolioController(dataController, $scope) {
    var prjs = [], prjAdd = [], dots = [], timer = []

    // retrieve data
    dataController.request().then(res => {
      // get data only from the response and pass to initializeData
      initializeData(res.map(value => value.data))
    })

    angular.element(() => {
      // all elements is loaded
      // re-initialize elements until they are surely loaded
      let i = setInterval(() => {
        initializeElements()
        if (dots) {
          // if done, start changing background and clear the time interval
          startBackground()
          clearInterval(i)
        }
      }, 200)

    })

    $scope.setBackground = (n, hover = true) => {
      clearTimeout(timer)
      for (let i = 0; i < dots.length; i = i + 2) { highlightBadge(i, false) }

      highlightBadge(n * 2, true)
      $scope.bgInterest = $scope.interests[n].url
      if (!hover) { $scope.$apply() }

      timer = setTimeout(() => {
        $scope.setBackground(n === dots.length / 2 - 1 ? 0 : ++n, false)
      }, 4000)
    }

    // mouse enter the project name
    $scope.enter = (index) => {
      setBlur()
      $scope.bgProject = $scope.projects[index].image || 'none'
      prjs[index].style.opacity = 1
      prjs[index].style.backgroundColor = '#0B0B0B'
    }

    // mouse leave the project name
    $scope.leave = () => {
      $scope.bgProject = 'none'
      setBlur(false)
    }

    function setBlur(blur = true) {
      const opacity = blur ? 0.2 : 1
      for (let i = 0; i < prjs.length; i++) {
        prjs[i].style.backgroundColor = 'transparent'
        prjs[i].style.opacity = opacity
      }
      for (let i = 0; i < prjAdd.length; i++) { prjAdd[i].style.opacity = opacity }
    }

    function highlightBadge(i, highlight) {
      dots[i].style.backgroundColor = highlight ? 'white' : 'black'
      dots[i].style.color = highlight ? 'black' : '#D4D4D4'
    }

    function startBackground() {
      $scope.setBackground(0, false)
    }

    function initializeData(data) {
      $scope.accounts = data[0]
      $scope.timeline = data[1]
      $scope.interests = data[2]
      $scope.projects = data[3]
    }

    function initializeElements() {
      dots = angular.element(document.getElementsByClassName('badge'))
      prjs = angular.element(document.getElementsByClassName('prj'))
      prjAdd = angular.element(document.getElementsByClassName('prj-add')) // additional elements in project
    }
  }])
})(window.angular)
