require('dotenv').config();
const {CLIENT_API_URL} = process.env;
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const validateToken = require('../authorization/authenticate');
const generateToken = require('../authorization/generateToken');
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/logout', (req, res) => {
    res.logout();
    res.redirect(CLIENT_API_URL);
})

router.get('/protected',
    validateToken,
    function(req, res) {
        res.sendStatus(200);
    });

router.post('/login',
    [
    check('email', 'Please include valid email').isEmail(),
    check('password', 'Password is required').exists()],

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({errors : errors.array()});
        }
        const {email, password} = req.body;

        try {
            let user  = await User.findOne({email});
            if (!user){
                return res.status(400).json({errors: [{msg: "Invalid Credentials"}]});
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch){
                return res.status(400).json({errors: [{msg: "Invalid Credentials"}]});
            }

            const payload = {
                user: {
                    id: user.id
                }
            };

            const token = generateToken(payload);
            res.status(200)
                .cookie('access_token', token, { httpOnly: true })
                .json({
                    success: true
                    })



        } catch(err){
            console.error(err.message);
            res.status(500).send('Server error');
        }

    });


module.exports = router;