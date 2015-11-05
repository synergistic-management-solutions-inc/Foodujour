app.controller('MealPlanner', ['$scope', function($scope){

  $scope.days = {
    "Sunday" : [
      {
        name : 'meal1',
        type : 'breakfast',
        notes : 'this was a crappy meal',
        ingredients : [
          'apples',
          'butter',
          'aardvark meat'
        ]
      }
    ],

    "Monday" : [
      {
        name : 'meal2',
        type : 'dinner',
        notes : 'this was a great meal',
        ingredients : [
          'apples',
          'bread',
          'rat meat'
        ]
      }
    ],

    "Tuesday" : [

    ],

    "Wednesday" : [

    ],

    "Thursday" : [

    ],

    "Friday" : [
      {
        name : 'meal6',
        type : 'snack',
        notes : 'this was a stupid meal',
        ingredients : [
          'oranges',
          'butter',
          'aardvark meat'
        ]
      }
    ],

    "Saturday" : [

    ],

    // "Sunday" : [

    // ]
  }

}]);