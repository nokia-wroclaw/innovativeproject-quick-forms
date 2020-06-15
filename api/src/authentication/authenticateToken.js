const jwt = require('express-jwt');
require('dotenv').config();

const { JWT_SECRET } = process.env;

const authenticateToken = jwt({
  secret: JWT_SECRET,
  getToken: function fromCookie(req) {
    if (req.cookies.access_token) return req.cookies.access_token;
  }
});

module.exports = authenticateToken;
