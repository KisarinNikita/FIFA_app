app.config(function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl:"login.html",
      controller: "loginCtrl"
    })
    .when('/player', {
      templateUrl:"player.html",
      controller: "playerCtrl",
      authenticated : true
    })
    .when('/send', {
      templateUrl:"send.html",
      controller: "playerCtrl"
    })
    .when('/accept', {
      templateUrl:"accept.html",
      controller: "gamesCtrl"
    })
    .otherwise({
      template:"404 error"
    })
});

app.run(function($rootScope, $location, authFact){
  $rootScope.$on('$routeChangeStart', function(event, next, current){
    if (next.$$route.authenticated){
      var userAuth = authFact.getAccessToken();
      if (!userAuth){
        $location.path('/');
       }
    }
  });
});
