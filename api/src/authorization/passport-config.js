require('dotenv').config()
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} = process.env
const User = require('../models/user.model')

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, id);
    });
});

passport.use(
    new GoogleStrategy({
        clientID:GOOGLE_CLIENT_ID,
        clientSecret:GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/auth/google/redirect'
    },
        (accessToken, refreshToken, profile, done) => {
            User.findOne({googleId:profile.id}).then(currentUser => {
                if (!currentUser){
                    new User({
                        name: profile.displayName,
                        googleId: profile.id
                    }).save().then(newUser => {
                        done(null, newUser);
                    })
                }
                else{
                    done(null, currentUser);
                }
            })
    })
)