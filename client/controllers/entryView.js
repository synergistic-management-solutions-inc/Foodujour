app.controller('entryView', ['$scope', '$http', '$state', function($scope, $http, $state) {
  
  $scope.entries = [];

  $http.get('/api/entries')
   .then(function(data){
      // console.log('entry: ', data);

    $scope.entries = data;
   });

   $scope.showEntries = function(e){
    $scope.entry = e;
    // console.log("this is e: ", e)
  }
   $scope.deleteEntry = function (e) {
    $scope.entry = e;
    // console.log('Entry_Id: ',$scope.entry.id)
    $http.get('api/entries/delete/' + $scope.entry.id)
    .then(function() {
      $state.reload();
    })
  };
}]);


