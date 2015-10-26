var db = require('../lib/db');

var User = {};

//*************TESTING PASSPORT WITHOUT DATABASE START*******************
//this needs to be erased
User.records = [
    { id: 1, username: 'rob', password: 'secret', displayName: 'robsoule', emails: [ { value: 'robi@example.com' } ] }
  , { id: 2, username: 'adam', password: 'iloveconsole', displayName: 'AdamNator', emails: [ { value: 'adam@example.com' } ] }
];


// We will want something like this but interacting with the database maybe with email address instead of username
User.findByUsername = function(username, cb) {
 
    for (var i = 0, len = User.records.length; i < len; i++) {
      var record = User.records[i];
      if (record.username === username) {
        return cb(null, record);
      }
    }
    return cb(null, null);
}

User.createUser = function(username){
// We want to check if the username exist User.findUsername()
  //if exist redirect with message
  //if it does not exist create and redirect to home page

}  

//*************TESTING PASSPORT WITHOUT DATABASE ENDS*******************


User.signUp = function (attrs) {

};

User.logIn = function (attrs) {
  
};

User.logOut = function(){

};

module.exports = User;
