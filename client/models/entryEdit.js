app.factory('EntryEdit', ['$http', '$state', function($http, $state) {

  var addEntry = function(entry){
    $http({
      method: 'POST',
      url: '/api/entries/',
      data: entry
    }).then(function(res){
      console.log('put em in', res);
    })
  }

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
    addEntry: addEntry, 
    updateEntry: updateEntry,
    mode: mode 
  };
}]);
