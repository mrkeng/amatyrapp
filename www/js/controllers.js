var mod = angular.module('starter.controllers', [])


// A simple controller that fetches a list of data from a service
WeatherIndexCtrl = mod.controller('WeatherIndexCtrl', function($scope, $http, WeatherService, current) {
  // serrvice returning data (services.js)
  //$scope.current = WeatherService.current();
  $scope.current = current;

  $http({
      method: 'JSONP',
      url: 'http://yr.hveem.no/api/day/today?start=today&callback=JSON_CALLBACK'
  }).then(function(data, status) {
    var tempdata = [];
    angular.forEach(data.data, function(entry) {
        tempdata.push(entry.outtemp);
    })
    $scope.tempdata = tempdata;
  })
  $http({
      method: 'JSONP',
      url: "http://yr.hveem.no/api/record/outtemp/max?start=today&callback=JSON_CALLBACK"
  }).then(function(data, status) {
      $scope.highTemp = data.data[0];
  })
  $http({
      method: 'JSONP',
      url: "http://yr.hveem.no/api/record/outtemp/min?start=today&callback=JSON_CALLBACK"
  }).then(function(data, status) {
      $scope.lowTemp = data.data[0];
  })
})


// A simple controller that shows a tapped item's data
mod.controller('WeatherDetailCtrl', function($scope, $stateParams, WeatherService) {
  // "Pets" is a service returning mock data (services.js)
  $scope.pet = WeatherService.get($stateParams.petId);
});

WeatherIndexCtrl.current = function($http, $q, $timeout) {
    var defer = $q.defer();
    $http.jsonp('http://yr.hveem.no/api/now?callback=JSON_CALLBACK').then(function(data) {
        data = data.data[0];
        defer.resolve(data);
    });
    return defer.promise;
}
