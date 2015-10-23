var db = require(__server + '/lib/db');
var request = require('supertest-as-promised');
var MealsAPI = require(__server + '/apis/meals-api');

describe('Meals API', function() {

  var app = TestHelper.createApp();
  app.use('/meals', MealsAPI);
  app.testReady();

  beforeEach(function() {
    return db.deleteEverything();
  });

  xit('creates and retrieves a meal', function() {

    return request(app)
      .post('/meals')
      .send({
        name: 'Hollaburger',
        location: 'Hollaville, USA',
        rating: 2,
        notes: 'These are some notes',
        image: 'https://img.google.com/horsehead.png'
      })
      .expect(201)
      .expect(function(response) {
        var newPet = response.body;

        expect(newPet.id).to.not.be.undefined;
        expect(newPet.name).to.equal('Hollaburger');
        expect(newPet.location).to.equal('Hollaville, USA');
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
});
