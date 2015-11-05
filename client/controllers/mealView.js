app.controller('MealView', ['$scope', '$http', '$state', 'MealForm', 'ConvertDate', 
  function($scope, $http, $state, MealForm, ConvertDate) {

  $http.get('/api/meals')
  .then(function(data){
    console.log('meals: ', data.data)
    $scope.meals = data.data;


    $http.get("/api/entries")
     .then(function(data){
        $scope.entries = data.data;
     })
   }); 

  $scope.entries = $scope.entries || [];  
// Filter to reverse order of ng-repeat on main view
  $scope.reverse = function() {
    return function(items) {
      return items.slice().reverse();
    }
  };

  $scope.showModal = function(m) {
    $scope.meal = m;
  };

  // $scope.hasEntries = function(m){

  //   $scope.entries.forEach(function(entry){
  //     if (entry.meal_id === m.id){
  //       return true;
  //     }
  //   })
  // }

  $scope.openForm = function(m){    
    if (m){
      MealForm.meal.id = m.id;
      var date = ConvertDate.convert(m.date);
    }
    else {
      delete MealForm.meal.id;
    }

    //if no meal was provided, newMeal should be set to true
    MealForm.mode.newMeal = !m;
    
    m = m || {};

    MealForm.meal.entries = m.entries || [];
    MealForm.meal.name = m.name || "Pizza"

    //auto sets the date to current day (in Texas)
    MealForm.meal.date = date || ConvertDate.convert(Date.now()/1000-21600);
    MealForm.meal.location = m.location || 'Tenochtitlan';
    MealForm.meal.rating = m.rating || 5;
    MealForm.meal.notes = m.notes || 'Meal was out of this world';
    MealForm.meal.image = m.image || 'http://i.imgur.com/n104JLy.jpg';

  }


 $scope.deleteMeal = function (m) {
    $scope.meal = m;
    // console.log('mea',$scope.meal.id)
    $http.get('api/meals/delete/' + $scope.meal.id)
    .then(function() {
      $state.reload();
    })
  };

}]);

