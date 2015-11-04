app.controller('entryView', ['$scope', '$http', '$state', 'EntryEdit', function($scope, $http, $state, EntryEdit) {
  
  $scope.entries = [];

  $http.get('/api/entries')
   .then(function(data){
      // console.log('entry: ', data);

    $scope.entries = data;
   });

   $scope.showEntries = function(e){
    $scope.entry = e;
    // console.log("this is e: ", e)
  }
   $scope.deleteEntry = function (e) {
    $scope.entry = e;
    console.log('Entry_Id: ',$scope.entry.id)
    $http.get('api/entries/delete/' + $scope.entry.id)
    .then(function() {
      $('.lean-overlay').remove();
      $state.reload();
    })
  };

  $scope.clickToEdit = function() {
    $scope.editorEnabled = false;
    $scope.editorEnabled = !$scope.editorEnabled;

    $scope.enableEditor = function() {
      $scope.editorEnabled = true;
      $scope.editableTitle = $scope.name;
    };

    $scope.disableEditor = function() {
      $scope.editorEnabled = false;
    };

    $scope.save = function(entry) {
      entry = $scope.entry
      EntryEdit.updateEntry(entry)
      $scope.disableEditor();
      $state.reload()
    };

  }
}]);



