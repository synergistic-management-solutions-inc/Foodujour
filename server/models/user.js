var db = require('../lib/db');

var User = {};

User.records = [
    { id: 1, username: 'jack', password: 'secret', displayName: 'Jack', emails: [ { value: 'jack@example.com' } ] }
  , { id: 2, username: 'jill', password: 'birthday', displayName: 'Jill', emails: [ { value: 'jill@example.com' } ] }
];

User.findById = function(id, cb) {
  process.nextTick(function() {
    var idx = id - 1;
    if (User.records[idx]) {
      cb(null, User.records[idx]);
    } else {
      cb(new Error('User ' + id + ' does not exist'));
    }
  });
}

User.findByUsername = function(username, cb) {
  process.nextTick(function() {
    for (var i = 0, len = User.records.length; i < len; i++) {
      var record = User.records[i];
      if (record.username === username) {
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
}

User.signUp = function (attrs) {

};

User.logIn = function (attrs) {
  
};

User.logOut = function(){

};

module.exports = User;
