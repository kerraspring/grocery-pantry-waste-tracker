var passport = require('passport');
var GoogleStrategy = require('passport-google-oidc');
require('dotenv').config()

passport.use(new GoogleStrategy({
    clientID: process.envGOOGLE_CLIENT_ID,
    clientSecret: process.envGOOGLE_CLIENT_SECRET,
    callbackURL: 'https://www.example.com/oauth2/redirect/google'
  },
  function(profile,done) {
    done(null,profile);
  }
));