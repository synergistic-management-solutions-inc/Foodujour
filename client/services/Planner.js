var moment = require('moment');

app.factory('Planner', ['$http', function($http) {

var addMealtoPlanner = function(meal) {
  return $http.post('/api/planner/', meal)
  .then(function(response){
    return response.data;
  });
}

var getAllPlannedMeals = function() {
  return $http.get('/api/planner/all')
  .then(function(response) {
    return response.data;
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