mongoose  = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var User = mongoose.model('User', {
  name:       String,
  login:      String,
  password:   String,
  birthdate:  Date,
  phone:      String
});

exports.list = function(req, res){
  res.format({
    html: function() {
      res.render('index');
    },
    json: function() {
      User.find({}, function(err, users){
        res.json(users);
      });
    }
  });
};

exports.create = function(req, res){
  res.format({
    json: function(){
      req.body.user.birthdate = parseDate(req.body.user.birthdate);

      var user = new User(req.body.user);

      user.save(function(err){
        if(!err)
          res.json(user.toObject());
        else
          res.json(null);
      });
    }
  })
}

function parseDate(date) {
  var parseDate = date.split('/');
  return new Date(parseDate[2], parseDate[1]-1, parseDate[0]);
}