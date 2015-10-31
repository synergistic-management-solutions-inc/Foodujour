var request = require('supertest');
var routes = require(__server + '/app.js');

describe('The Server', function() {

  var app = TestHelper.createApp();
  app.use('/', routes);
  app.testReady();

  it('serves an example endpoint', function() {

    // Mocha will wait for returned promises to complete
    return request(app)
      .get('/api/tags-example')
      .expect(200)
      .expect(function(response) {
        expect(response.body).to.include('node');
      });
  });

  it('accesses database', function() {
    return db('users').where({name: 'nanner12'}).limit(1)
      .then(function(rows) {
        expect(rows.length).to.equal(1);
      });
  });
});
