// to be replaced with another controller
app.controller('mealView', ['$scope', '$http', function($scope,$http) {
  

  $http.get("/meals")
   .then(function(data){
   	// console.log('Data: ', data)
   	for(var i = 0; i < data.data.length; i++){
   	// console.log('Name: ', data.data[i].name)
   	$scope.meals = data.data[i];
    console.log(data.data[i])
    }
   })
}]);
