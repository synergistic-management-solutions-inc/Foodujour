var request = require('supertest-as-promised');
var EntriesAPI = require(__server + '/apis/entries-api');
var app = TestHelper.createApp();

describe('Entries API', function() {
  before(function() {
    // mocks a logged in user
    app.use(function(req, res, next) {
      req.session = {};
      // 'asdf' is user id:1 after running knex migration and knex seed:run
      req.session.passport = {
        user: 'asdf'
      };
      req.isAuthenticated = function() {
        return true;
      };
      next();
    });
    // end
    app.use('/entries', TestHelper.isLoggedIn, EntriesAPI);
    app.testReady();
  });

  beforeEach(function() {
    return db('meals').truncate()
      .then(function() {
        return db('entries').truncate();
      });
  });

 it('POST /entries creates an entry and returns entry', function() {
    return request(app)
      .post('/entries')
      .send({
        meal_id: 3,
        name: 'sliderHolla',
        rating: 1,
        notes: 'These are some smaller entry notes',
        image: 'https://img.google.com/horsey.png'
      })
      .expect(201)
      .expect(function(response) {
        var newEntry = response.body;

        expect(newEntry.id).to.not.be.undefined;
        expect(newEntry.name).to.equal('sliderHolla');
        expect(newEntry.meal_id).to.equal(3);
        expect(newEntry.user_id).to.equal(1);
        expect(newEntry.notes).to.equal('These are some smaller entry notes');
      })
      .then(function(){
        return request(app)
          .get('/entries')
          .expect(200)
          .expect(function(response) {
            var entries = response.body;

            expect(entries).to.be.an.instanceOf(Array);
            expect(entries).to.have.length(1);
            expect(entries[0].name).to.equal('sliderHolla');
          });
      });
  });
});
