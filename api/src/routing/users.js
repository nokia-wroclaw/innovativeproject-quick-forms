const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator/check');

// @route  GET api/users
// @desc   Test route
// @access Public

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
    (req, res) => {
    res.send('User route');
});

module.exports = router;