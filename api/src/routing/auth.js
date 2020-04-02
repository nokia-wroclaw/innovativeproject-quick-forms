const express = require('express');
const router = express.Router();
const auth = require('../authorization/authmiddleware');

// @route  GET api/auth
// @desc   Test route
// @access Public

router.get('/', auth, (req, res) => {
    res.send('Auth route')
});


module.exports = router;