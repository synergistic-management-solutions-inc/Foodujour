app.controller('entryView', ['$scope', '$http', function($scope,$http) {
  

  $http.get("/entries")
   .then(function(data){
   	// console.log('Data: ', data)
   	// for(var i = 0; i < data.data.length; i++){
   	// console.log('Name: ', data.data[i].name)
    // console.log(data.data[i])
    // }
   	$scope.entries = data;
   })
}]);
