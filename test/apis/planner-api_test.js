var request = require('supertest-as-promised');
var PlannerAPI = require(__server + '/apis/planner-api');
var app = TestHelper.createApp();

describe('Planner API', function() {
  describe('Valid user Logged in', function() {
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
      app.use('/planner', TestHelper.isLoggedIn, PlannerAPI);
      app.testReady();
    });

    // valid meal should insert
    var meal1 = {
      user_id: 1,
      date: Math.floor(Date.now() / 1000),
      name: 'Hollaburger',
      type: 'Elevensies',
      notes: 'These are some notes'
    };

    // valid meal without notes or type should use logged in user's id
    // if not given one
    var meal2 = {
      date: Math.floor(Date.now() / 1000),
      name: 'Dead Lobster',
    };

    // no name included should not insert
    var invalidMeal = {
      user_id: 1,
      date: Math.floor(Date.now() / 1000),
      notes: 'These are some notes'
    };

    // Condensed insert methods
    var singlePost = function(item, route, codeToExpect) {
      return request(app)
      .post(route)
      .send(item)
      .expect(codeToExpect);
    };

    beforeEach(function() {
      // erase db before each test runs
      return db('planner').truncate();
    });

    it('POST /api/planner returns 400 on bad data request', function() {
      return singlePost(invalidMeal, '/planner', 400)
      .then(function() {
        return request(app)
        .get('/planner')
        .expect(200)
        .expect(function(response) {
          var meals = response.body;
          expect(meals).to.be.an.instanceOf(Array);
          expect(meals).to.have.length(0);
        });
      });
    });

    it('POST /api/planner creates a meal and returns meal with id', function() {
      return singlePost(meal1, '/planner', 201)
      .expect(function(response) {
        var newMeal = response.body;

        expect(newMeal.id).to.not.be.undefined;
        expect(newMeal.user_id).to.equal(1);
        expect(newMeal.name).to.equal('Hollaburger');
        expect(newMeal.type).to.equal('Elevensies');
      })
      .then(function(){
        return request(app)
        .get('/planner')
        .expect(200)
        .expect(function(response) {
          var meals = response.body;

          expect(meals).to.be.an.instanceOf(Array);
          expect(meals).to.have.length(1);
          expect(meals[0].name).to.equal('Hollaburger');
        });
      });
    });

    it('GET /api/planner returns an array with all the meals', function() {
      return singlePost(meal1, '/planner', 201)
      .then(function() {
        return singlePost(meal2, '/planner', 201);
      })
      .then(function(){
        return request(app)
        .get('/planner')
        .expect(200)
        .expect(function(response) {
          var meals = response.body;
          expect(meals).to.be.an.instanceOf(Array);
          expect(meals).to.have.length(2);
          expect(meals[0].name).to.equal('Hollaburger');
          expect(meals[1].name).to.equal('Dead Lobster');
        });
      });
    });

    it('GET /api/planner/:id returns 404 if meal does not exist', function() {
      return singlePost(meal1, '/planner', 201)
      .then(function() {
        return singlePost(meal2, '/planner', 201);
      })
      .then(function(response){
        var mealId = response.body.id;
        return request(app)
        .get('/planner/831234')
        .expect(404);
      });
    });

    it('GET /api/planner/:id returns meal object if it exists', function() {
      return singlePost(meal1, '/planner', 201)
      .then(function() {
        return singlePost(meal2, '/planner', 201);
      })
      .then(function(response){
        var mealId = response.body.id;
        return request(app)
        .get('/planner/' + mealId)
        .expect(200)
        .expect(function(response) {
          var meal = response.body;
          expect(meal).to.be.an.instanceOf(Object);
          expect(meal).to.not.be.an.instanceOf(Array);
          expect(meal.user_id).to.equal(1);
          expect(meal.name).to.equal('Dead Lobster');
        });
      });
    });

  })
});
