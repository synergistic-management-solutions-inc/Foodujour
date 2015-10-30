app.controller('entryView', ['$scope', '$http', function($scope, $http) {
  
  $scope.entries = [];

  $http.get('/api/entries')
   .then(function(data){
      console.log('entry: ', data);

      $scope.entries = data;
   });
   
   $scope.showEntries = function(e){
    $scope.entry = e;
    console.log("this is e: ", e)
  }
}]);
