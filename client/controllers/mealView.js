// to be replaced with another controller
app.controller('mealView', ['$scope', '$http', function($scope, $http) {
  


  $http.get('/api/meals')
  .then(function(data){
    console.log('Data: ', data.data)
    for(var i = 0; i < data.data.length; i++){
    // console.log('Number: ', data.data[i].id)
    $scope.meals = data.data;

    // }
    // $http.get("/meals" + "/" + $scope.meals[i].id)
     // .then(function(data){
    //   for(var j = 0; j< data.data.entries.length; j++){
    //    // console.log("Entry data: ", data.data.entries[j])
    //    console.log("Meal_id: ",data.data.entries[j])
    //  // if(data.data.entries[j].meal_id === data.data[j].id){
        // $scope.entries = data.data.entries;
    //   }
     // })
    // }

    }

   });

  $scope.showModal = function(m) {
    $scope.meal = m;
    
    console.log("this is m: ", m)
  };
}]);

