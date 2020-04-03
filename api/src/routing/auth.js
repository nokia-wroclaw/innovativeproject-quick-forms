const express = require('express');
const router = express.Router();
const auth = require('../authorization/authmiddleware');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
router.use(express.json());
router.use(express.urlencoded({ extended: true }));


router.get('/', auth, (req, res) => {
    res.send('Auth route')
});

router.post('/',
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

            // todo hide secret
            jwt.sign(
                payload,
                "Secret",
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