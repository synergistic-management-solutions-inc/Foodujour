app.factory('EntryEdit', ['$http', '$state', function($http, $state) {

  var updateEntry = function(entry) {
    console.log('Updating entry:', entry);
    $http({
      method: 'PUT',
      url: '/api/entries/'+entry.id,
      data: entry
    })
    .then(function(res) {
      console.log('Response:', res);
      $state.reload();
    });
  };

  return {
    updateEntry: updateEntry
  };
}]);
