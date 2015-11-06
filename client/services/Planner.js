var moment = require('moment');

app.factory('Planner', ['$http', function($http) {

var addMealtoPlanner = function(meal) {
  return $http.post('/api/planner/', meal)
  .then(function(response){
    return response.data;
  });
}

var getAllPlannedMeals = function() {
  $http.get('/api/planner/all')
  .then(function(response) {
    console.log('response', response)
  })
}

var getOnePlannedMeal = function(id) {
  $http.get('/api/planner/' + id)
  .then(function(response) {
    console.log('response', response);
  })
}

return {
  addMealtoPlanner : addMealtoPlanner,
  getAllPlannedMeals : getAllPlannedMeals,
  getOnePlannedMeal : getOnePlannedMeal
};

}]);