var request = require('supertest-as-promised');
var EntriesAPI = require(__server + '/apis/entries-api');

describe('Entries API', function() {
  describe('No valid user logged in', function() {
    var app = TestHelper.createApp();

    before(function() {
      // mocks an invalid logged in user / not logged in
      app.use(function(req, res, next) {
        req.session = {};
        req.session.passport = {};
        req.isAuthenticated = function() {
          return false;
        };
        next();
      });
      // end
      app.use('/entries', TestHelper.isLoggedIn, EntriesAPI);
      app.testReady();
    });

    it('GET /api/entries returns 401 unauthorized', function() {
      return request(app)
        .get('/entries')
        .expect(401);
    });

    it('POST /api/entries return 401 unauthorized', function() {
      return request(app)
        .post('/entries')
        .send({ holla: 'holla' })
        .expect(401);
    });

    it('GET /api/entries/:id returns 401 unauthorized', function() {
      return request(app)
        .get('/entries/8')
        .expect(401);
    });

    it('PUT /api/entries/:id returns 401 unauthorized', function() {
      return request(app)
        .put('/entries/8')
        .expect(401);
    });

    it('GET /api/entries/delete/:id returns 401 unauthorized', function() {
      return request(app)
        .get('/entries/8')
        .expect(401);
    });

  });
});
