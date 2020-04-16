const jwt = require('express-jwt');
require('dotenv').config();
const {JWT_SECRET} = process.env;

const authenticate = jwt({secret: JWT_SECRET});

module.exports = authenticate;
