const express = require('express');

const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const generateToken = require('../authentication/generateToken');

const {CLIENT_API_URL} = process.env;

const EMAIL_SCOPE = 'https://www.googleapis.com/auth/userinfo.email';
const PROFILE_SCOPE = 'https://www.googleapis.com/auth/userinfo.profile';

router.get(
  '/google',
  passport.authenticate('google', {
    scope: [EMAIL_SCOPE, PROFILE_SCOPE],
  })
);

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  const {user} = req;
  const payload = {
    user: {
      id: user.id,
    },
  };
  res
    .status(200)
    .cookie('access_token', generateToken(payload))
    .redirect(CLIENT_API_URL);
});

module.exports = router;
