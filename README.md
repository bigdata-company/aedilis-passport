# aedilis-passport

Aedilis authentication strategy based on the HTTP Bearer authentication strategy for [Passport](http://passportjs.org/).

## Install

    $ npm install aedilis-passport
    
## Usage

#### Configure Strategy

The Aedilis strategy authenticates users using a bearer token and is built on top of the 
HTTP Bearer authentication strategy by [Jared Hanson](https://github.com/jaredhanson/passport-http-bearer).  
The verify callback needed by the HTTP Bearer strategy is implemented in the Aedilis strategy. During
this callback a connection will be made to consul to resolve the token to a specific user.

    passport.use(new AedilisStrategy({
      host: "<aedilis-host>",
      port: "<aedilis-port>"
    }));

#### Authenticate Requests

Since the Aedilis strategy is an extension of the Bearer strategy you can use `passport.authenticate()`, specifying the `'bearer'` strategy, to authenticate requests.  Requests containing bearer tokens do not require session
support, so the `session` option can be set to `false`.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

    app.get('/profile', 
      passport.authenticate('bearer', { session: false }),
      function(req, res) {
        res.json(req.user);
      });