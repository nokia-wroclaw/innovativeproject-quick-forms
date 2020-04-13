require('dotenv').config()
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} = process.env
const User = require('../models/user.model')


const verifyUser = (id, email, done) => {
    User.findOne({googleId:id}).then(currentUser => {
        if (!currentUser){
            new User({
                googleId: id,
                email: email
            }).save().then(newUser => {
                done(null, newUser);
            })
        }
        else{
            done(null, currentUser);
        }
    })
}

const strategyOptions = {
        clientID:GOOGLE_CLIENT_ID,
        clientSecret:GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/auth/google/redirect'
    }


const verifyCallback = async (accessToken, refreshToken, profile, done) => {
    await verifyUser(profile.id, profile.emails[0].value, done);
}

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, id);
    });
});

passport.use(new GoogleStrategy(strategyOptions, verifyCallback));