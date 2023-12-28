const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/redirect/google",
    },
    async (accessToken, refreshToken, profile, done) => {
      const newUser = {
        googleId: profile.id,
        displayName: profile.displayName,
      };

      try {
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          done(null, user);
        } else {
          user = await User.create(newUser);
          done(null, user);
        }
      } catch (err) {
        console.error(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  process.nextTick(function () {
    done(null, { id: user.id, username: user.username, name: user.name });
  });
});

passport.deserializeUser((user, done) => {
  process.nextTick(function () {
    return done(null, user);
  });
});

const router = express.Router();

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "user failed to authenticate.",
  });
});

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    res.redirect(process.env.CLIENT_HOME_PAGE_URL);
  });
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get('/redirect/google', passport.authenticate('google', {
  successReturnToOrRedirect: process.env.CLIENT_HOME_PAGE_URL,
  failureRedirect: '/auth/login/failed'
}));

module.exports = router;
