app.factory('EntryEdit', ['$http', '$state', function($http, $state) {

  var updateEntry = function(entry) {
    $http({
      method: 'PUT',
      url: '/api/entries/'+entry.id,
      data: entry
    })
    .then(function(res) {
    });
  };

  var mode = {editable: true};

  return {
    updateEntry: updateEntry,
    mode: mode 
  };
}]);
