require('dotenv').config();

const {CLIENT_API_URL} = process.env;
const express = require('express');

const router = express.Router();
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const generateToken = require('../authorization/generateToken');

router.use(express.json());
router.use(express.urlencoded({extended: true}));

const hashPassword = async password => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const createUser = (name, email, password) => {
  return new User({
    name,
    email,
    password,
  });
};

router.get('/', (req, res) => res.send('User route'));

router.post(
  '/register',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include valid email').isEmail(),
    check(
      'password',
      'Please enter password with 6 or more characters'
    ).isLength({min: 6}),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    const {name, email, password} = req.body;

    try {
      let user = await User.findOne({email});
      if (user) {
        return res.status(400).json({errors: [{msg: 'User already exists'}]});
      }

      user = createUser(name, email, password);
      user.password = await hashPassword(user.password);
      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      const token = generateToken(payload);
      res
        .status(200)
        .cookie('access_token', token)
        .json({
          success: true,
        });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
