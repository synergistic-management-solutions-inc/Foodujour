app.factory('Planner', ['$http', function($http) {


var addMealtoPlanner = function(meal) {

var userData = 
  {
    name: "beer-eal",
    type: "breakfast",
    notes: "An new favorite since my wife left me",
    date: 1446703200,
  }

  $http.post('/api/planner/', userData)
  .then(function(response){
    console.log(response)
  });
}

return {
  addMealtoPlanner : addMealtoPlanner
};

}]);