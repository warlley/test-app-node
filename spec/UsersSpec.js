var request = require('request');

describe('testando users routes', function(){

  it("get /", function(done){
    request('http://localhost:3000/', function(error, response, body){
      expect(response.statusCode).toEqual(200);
      done();
    });
  });

  it("get /users (json)", function(done){
    request({
      uri:  'http://localhost:3000/users',
      json: true
    },

    function(error, response, body){
      expect(response.statusCode).toEqual(200);
      done();
    });
  });

  it("post /users", function(done){
    request.post({
      uri:  'http://localhost:3000/users',
      json: true,
      body: {
        user: {
          name:       'Warlley Rezende',
          birthdate:  '19/03/1988',
          login:      'warlley',
          phone:      '9999-9999',
          password:   '12345678'
        }
      }
    },

    function(error, response, body){
      expect(response.statusCode).toEqual(200);
      expect(body.name).toEqual('Warlley Rezende');
      done();
    });
  });

});