require('dotenv').config();
const {JWT_SECRET, EXPIRY_TIME } = process.env;
const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
    jwt.sign(
        payload,
        JWT_SECRET,
        {expiresIn: EXPIRY_TIME},
        (err, token) => {
            if (err) throw err;
            return token;
        });
}

module.exports = generateToken;