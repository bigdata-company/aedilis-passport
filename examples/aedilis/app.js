var express = require('express')
  , passport = require('passport')
  , util = require('util')
  , AedilisStrategy = require('aedilis-passport');


// Use the BearerStrategy within Passport.
//   Strategies in Passport require a `validate` function, which accept
//   credentials (in this case, a token), and invoke a callback with a user
//   object.
passport.use(new AedilisStrategy({
  host: 'localhost',
  port: 8500
};

var app = express();
app.use(passport.initialize());
app.use(express.static(__dirname + '/public'));

// curl -v http://127.0.0.1:3000/?access_token=123456789
app.get('/',
  // Authenticate using HTTP Bearer credentials, with session support disabled.
  passport.authenticate('bearer', { session: false }),
  function(req, res){
    res.json(req.user);
  });

app.listen(3000, function() {
  console.log("Aedilis Passport.js Demo running at localhost:3000");
  console.log("Execute 'curl -v http://127.0.0.1:3000/?access_token=<aedilis-access-token>' to interact");

});
