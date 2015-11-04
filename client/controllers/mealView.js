app.controller('MealView', ['$scope', '$http', '$state', 'MealForm', 'ConvertDate', 
  function($scope, $http, $state, MealForm, ConvertDate) {

  $http.get('/api/meals')
  .then(function(data){
    // console.log('Data: ', data.data)
    $scope.meals = data.data;


    $http.get("/api/entries")
     .then(function(data){
      // console.log("what is:", data.data)
        $scope.entries = data.data;
     })
   }); 

// Filter to reverse order of ng-repeat on main view
  $scope.reverse = function() {
    return function(items) {
      return items.slice().reverse();
    }
  };

  $scope.showModal = function(m) {
    $scope.meal = m;
  };

  $scope.openForm = function(m){    
    if (m){
      MealForm.meal.id = m.id;
      m.date = ConvertDate.convert(m.date);
    }

    //if no meal was provided, newMeal should be set to true
    MealForm.mode.newMeal = !m;
    
    m = m || {};

    MealForm.meal.entries = m.entries || [];
    MealForm.meal.name = m.name || "Pizza"
    //TODO: auto set current date
    MealForm.meal.date = m.date || '10/16/2015';
    console.log('did we get the date alright?', ConvertDate.convert(m.date));
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

