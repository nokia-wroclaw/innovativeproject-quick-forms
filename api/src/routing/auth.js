require('dotenv').config();
const {JWT_SECRET} = process.env;
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const passport = require('passport');
router.use(express.json());
router.use(express.urlencoded({ extended: true }));



router.get('/google', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email']
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res) =>{
   res.redirect('http://localhost:3000');
});

router.get('/logout', (req, res) => {
    res.logout();
    res.redirect('http://localhost:3000');
})

router.get('/login', (req, res) => {

})

router.post('/login',
    [
        check('email', 'Please include valid email').isEmail(),
        check('password', 'Password is required')
            .exists()
    ],
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