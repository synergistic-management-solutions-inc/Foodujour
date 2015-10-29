app.controller('entryView', ['$scope', '$http', function($scope, $http) {
  
  $scope.entries = [];

  $http.get('/api/entries')
   .then(function(data){
      console.log('entry: ', data);
      // for(var i = 0; i < data.data.length; i++){
      // console.log('Name: ', data.data[i].name)
      // console.log(data.data[i])
      // }

      $scope.entries = data;
   });
}]);
