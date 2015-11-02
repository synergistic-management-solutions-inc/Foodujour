var request = require('supertest-as-promised');
var MealsAPI = require(__server + '/apis/meals-api');

describe('Meals API', function() {
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
      app.use('/meals', TestHelper.isLoggedIn, MealsAPI);
      app.testReady();
    });

    it('GET /api/meals returns 401 unauthorized', function() {
      return request(app)
        .get('/meals')
        .expect(401);
    });

    it('POST /api/meals return 401 unauthorized', function() {
      return request(app)
        .post('/meals')
        .send({ holla: 'holla' })
        .expect(401);
    });

    it('GET /api/meals/:id returns 401 unauthorized', function() {
      return request(app)
        .get('/meals/8')
        .expect(401);
    });

    it('PUT /api/meals/:id returns 401 unauthorized', function() {
      return request(app)
        .put('/meals/8')
        .expect(401);
    });

    it('GET /api/meals/delete/:id returns 401 unauthorized', function() {
      return request(app)
        .get('/meals/8')
        .expect(401);
    });

  });
});
