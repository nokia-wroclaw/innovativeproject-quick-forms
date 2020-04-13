const express = require('express');
const router = express.Router();
const passport = require('passport');


router.get('/google', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email']
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res) =>{
    res.redirect('http://localhost:3000');
});


module.exports = router;