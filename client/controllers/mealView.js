// to be replaced with another controller
app.controller('mealView', ['$scope', '$http', function($scope,$http) {
  

  $http.get("/meals")
   .then(function(data){
   	 // console.log('Data: ', data.data)
   	 for(var i = 0; i < data.data.length; i++){


   	 console.log('Number: ', data.data[i].id)

   	 $scope.meals = data.data;
    // console.log(data.data[i])
    // }
    $http.get("/meals" + "/" + $scope.meals[i].id)
     .then(function(data){




     	console.log("haha", data.data.entries.length)
      for(var i = 0; i< data.data.entries.length; i++){
     	// console.log("Entry data: ", data.data.entries[i])
     	console.log("Meal_id: ",data.data.entries[i])
    	// if(data.data.entries[i].meal_id === data.data[i].id){

    

     // 	console.log("haha", data.data.entries.length)
     //  for(var i = 0; i< data.data.entries.length; i++){
     // 	// console.log("Entry data: ", data.data.entries[i])
     // 	console.log("Meal_id: ",data.data.entries[i])
    	// // if(data.data.entries[i].meal_id === data.data[i].id){
     //  }



      for(var j = 0; j< data.data.entries.length; j++){
     	// console.log("Entry data: ", data.data.entries[j])
     	console.log("Meal_id: ",data.data.entries[j])
    	// if(data.data.entries[j].meal_id === data.data[j].id){



        $scope.entries = data.data.entries;

     	// console.log("ID", $scope.meals.id)
      for(var j = 0; j< data.data.entries.length; j++){
     	// console.log("Meal_id: ",data.data.entries[j])

      }
        $scope.entries = data.data.entries;
     
     })
 	}
   })

}]);
