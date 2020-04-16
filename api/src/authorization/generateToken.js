require('dotenv').config();
const {JWT_SECRET, EXPIRY_TIME} = process.env;
const jwt = require('jsonwebtoken');

const generateToken = payload => {
  return jwt.sign(payload, JWT_SECRET, {expiresIn: EXPIRY_TIME});
};

module.exports = generateToken;
