var db = require(__server + '/lib/db');
var request = require('supertest-as-promised');
var MealsAPI = require(__server + '/apis/meals-api');

describe('Meals API', function() {

  var app = TestHelper.createApp();
  app.use('/meals', MealsAPI);
  app.testReady();

  // valid meal should insert
  var meal1 = {
    user_id: 'a1234asdfavar1',
    date: Math.floor(Date.now() / 1000),
    name: 'Hollaburger',
    location: 'Hollaville, USA',
    rating: 2,
    notes: 'These are some notes',
    image: 'https://img.google.com/horsehead.png'
  };

  // valid meal without notes or image
  var meal2 = {
    user_id: 'b12asdfavar1',
    date: Math.floor(Date.now() / 1000),
    name: 'Dead Lobster',
    location: 'Rooflecoast, US',
    rating: 2
  };

  // no name included should not insert
  var invalidMeal = {
    user_id: 'a1234asdfavar1',
    date: Math.floor(Date.now() / 1000),
    location: 'Hollaville, USA',
    rating: 2,
    notes: 'These are some notes',
    image: 'https://img.google.com/horsehead.png'
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
    return db.deleteEverything();
  });

  it('POST /meals returns 400 on bad data request', function() {
    return singlePost(invalidMeal, '/meals', 400)
        .then(function() {
        return request(app)
          .get('/meals')
          .expect(200)
          .expect(function(response) {
            var meals = response.body;
            expect(meals).to.be.an.instanceOf(Array);
            expect(meals).to.have.length(0);
          });
      });
  });

  it('POST /meals creates a meal and returns meal with id', function() {
    return singlePost(meal1, '/meals', 201)
      .expect(function(response) {
        var newPet = response.body;

        expect(newPet.id).to.not.be.undefined;
        expect(newPet.user_id).to.equal('a1234asdfavar1');
        expect(newPet.name).to.equal('Hollaburger');
        expect(newPet.location).to.equal('Hollaville, USA');
        expect(newPet.rating).to.equal(2);
        expect(newPet.image).to.equal('https://img.google.com/horsehead.png');
      })
      .then(function(){
        return request(app)
          .get('/meals')
          .expect(200)
          .expect(function(response) {
            var meals = response.body;
            expect(meals).to.be.an.instanceOf(Array);
            expect(meals).to.have.length(1);
            expect(meals[0].name).to.equal('Hollaburger');
          });
      });
  });

  it('GET /meals returns an array with all the meals', function() {
    return singlePost(meal1, '/meals', 201)
      .then(function() {
        return singlePost(meal2, '/meals', 201);
      })
      .then(function(){
        return request(app)
          .get('/meals')
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

  it('GET /meals/:id returns 404 if meal does not exist', function() {
    return singlePost(meal1, '/meals', 201)
      .then(function() {
        return singlePost(meal2, '/meals', 201);
      })
      .then(function(response){
        var mealId = response.body.id;
        return request(app)
          .get('/meals/831234')
          .expect(404);
      });
  });

  it('GET /meals/:id returns meal object if it exists', function() {
    return singlePost(meal1, '/meals', 201)
      .then(function() {
        return singlePost(meal2, '/meals', 201);
      })
      .then(function(response){
        var mealId = response.body.id;
        return request(app)
          .get('/meals/' + mealId)
          .expect(200)
          .expect(function(response) {
            var meal = response.body;
            expect(meal).to.be.an.instanceOf(Object);
            expect(meal).to.not.be.an.instanceOf(Array);
            expect(meal.user_id).to.equal('b12asdfavar1');
            expect(meal.name).to.equal('Dead Lobster');
            expect(meal.location).to.equal('Rooflecoast, US');
            expect(meal.rating).to.equal(2);
          });
      });
  });
});
