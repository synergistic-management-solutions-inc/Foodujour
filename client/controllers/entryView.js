app.controller('entryView', ['$scope', '$http', '$state', 'EntryEdit', function($scope, $http, $state, EntryEdit) {
  
  $scope.entries = [];

  $http.get('/api/entries')
   .then(function(data){
      // console.log('entry: ', data);

    $scope.entries = data;
   });

   $scope.mode = EntryEdit.mode;

   $scope.test = function(parent){
    console.log('parent', $scope.$parent);
    return true; 
   }

   $scope.belongsTo = function(e, m){
    // console.log('belongs', e, m)
    if (!m){
      return true;
    }

    return e.meal_id === m.id
   }

   $scope.showEntries = function(e){
    // console.log('showing entry', e);
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

  // Handle editable fields
  $scope.clickToEdit = function(noteField) {
    if (!$scope.mode.editable) return; 
    // Determine which field. Probably will need to update this logic when we have ratings.
    // editorEnabled fields are flags to determine whether the hidden inputs are active
    if (noteField === undefined) {
      $scope.name = '';
      $scope.editorEnabled = false;
      $scope.editorEnabled = !$scope.editorEnabled;
    } else {
      $scope.notes = '';
      $scope.noteEditorEnabled = false;
      $scope.noteEditorEnabled = !$scope.noteEditorEnabled;
    }

    $scope.enableEditor = function() {
      $scope.editorEnabled = true;
      $scope.editableName = $scope.entry.name;
    };

    $scope.disableEditor = function() {
      $scope.editorEnabled = false;
    };

    $scope.disableNoteEditor = function() {
      $scope.noteEditorEnabled = false;
    };

    $scope.save = function(entry) {
      entry = $scope.entry
      entry.name = $scope.editableName;
      entry.notes = $scope.editableNotes;
      EntryEdit.updateEntry(entry)
      $scope.disableEditor();
      $scope.disableNoteEditor();
    };

  }
}]);



