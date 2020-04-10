require('dotenv').config();
const {JWT_SECRET} = process.env;
const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// todo change jwt to passport-jwt

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/', (req, res) =>
    res.send('User route'));

router.post('/',
    [
    check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include valid email').isEmail(),
        check('password', 'Please enter password with 6 or more characters')
            .isLength({min : 6})
    ],
   async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }
        const {name, email, password} = req.body;

    try {
        let user  = await User.findOne({email});
        if (user){
           return res.status(400).json({errors: [{msg: "User already exists"}]});
        }

        user = new User({
            name,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            JWT_SECRET,
            {expiresIn: 3600},
            (err, token) => {
            if (err) throw err;
            res.json({token});
        });

    } catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }

});



module.exports = router;