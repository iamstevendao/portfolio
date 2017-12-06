(function (angular) {
  'use strict'
  angular.module('data', [])
    .factory('dataController', ['$q', '$http', function ($q, $http) {
      let requests = []
      let contents = ['accounts', 'timeline', 'interest', 'projects']

      // create requests
      contents.forEach((value) => {
        requests.push($http.get('json/' + value + '.json', { cache: false }))
      })

      // request function
      const request = () => $q.all(requests).then(data => data)

      return { request }
    }])
})(window.angular)
