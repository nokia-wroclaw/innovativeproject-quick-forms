require('dotenv').config();
const express = require('express');

const router = express.Router();
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;

const { GITHUB_CLIENT_ID } = process.env;
const { GITHUB_CLIENT_SECRET } = process.env;
const { GITHUB_CALLBACK_URL } = process.env;

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: GITHUB_CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, done) {
      // asynchronous verification, for effect...
      console.log({ accessToken, refreshToken, profile });

      new User({ username: profile.username }).fetch().then(user => {
        if (!user) {
          user = User.forge({ username: profile.username });
        }

        user.save({ profile, access_token: accessToken }).then(() => {
          return done(null, user);
        });
      });
    }
  )
);
router.use(
  session({ secret: 'keyboard cat', resave: false, saveUninitialized: false })
);
router.use(passport.initialize());
router.use(passport.session());

router.get('/', (req, res) => {
  res.send("<a href='/secret'>Access Secret Area</a>");
});

router.get('/login', (req, res) => {
  res.send("<a href='auth/github'>Sign in With GitHub</a>");
});

router.get('/secret', ensureAuthenticated, (req, res) => {
  res.send(`<h2>yo ${req.user}</h2>`);
});

router.get(
  '/auth/github',
  passport.authenticate('github', { scope: ['repo:status'] }),
  function(req, res) {}
);

router.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/signin' }),
  function(req, res) {
    res.redirect('/');
  }
);

module.exports = router;
