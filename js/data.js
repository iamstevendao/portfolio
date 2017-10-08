(function (angular) {
  'use strict'
  angular.module('data', [])
    .factory('dataController', ['$q', '$http', function ($q, $http) {
      let reqAccounts = $http.get('json/accounts.json', { cache: false })
      let reqTimeline = $http.get('json/timeline.json', { cache: false })
      let reqInterest = $http.get('json/interest.json', { cache: false })
      let reqProjects = $http.get('json/projects.json', { cache: false })
      var request = function () {
        return $q.all([reqAccounts, reqTimeline, reqInterest, reqProjects])
          .then(function (data) {
            return data
          })
      }
      return { request: request }
    }])
})(window.angular)
