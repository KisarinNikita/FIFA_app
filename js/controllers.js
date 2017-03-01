app.controller('loginCtrl', function ($scope, authFact, $location, $cookieStore){
  $scope.name = 'Login please';
  $scope.FBlogin = function(){
    FB.login(function(response) {
      if (response.authResponse) {
       FB.api('/me', 'GET', {fields : 'id, name, picture.width(150).height(150)'},  function(response) {
         console.log('Good to see you, ' + response.name + '.');
         console.log(response);
         $cookieStore.put('userObj', response);

         var accessToken = FB.getAuthResponse().accessToken;
         console.log(accessToken);
         authFact.setAccessToken(accessToken);
         $location.path('/player');
         $scope.$apply();
       });
      } else {
       console.log('User cancelled login or did not fully authorize.');
      }
    });
  };
});

app.controller('playerCtrl', function ($scope, $http, $cookieStore, authFact){
  var userObj = authFact.getUserObj();
  console.log(userObj);
  $scope.name = userObj.name;
  $scope.photo = userObj.picture.data.url;

  $http.post('http://localhost:8000/#/player', userObj)
   .success(function (result) {
       console.log('userObj successfully saved to backend');
   })
   .error(function (result) {
       console.log('Error in book post');
   });

  $http.get("data.json").success(function(data) {
    $scope.players = data;
  });

  $http.get("data-games.json").success(function(data) {
    $scope.history = data;
  });
  
});
