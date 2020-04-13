const express = require('express');
require('dotenv').config();
const {COOKIE_KEY, EXPIRY_TIME } = process.env;
const app = express();
const cors = require('cors');
const passport = require('passport');
const cookieSession = require('cookie-session');
const connectDb = require('./src/connection/connection');
const passportGoogleStrategy = require('./src/authorization/passportGoogleStrategy')
const filledFormsRoute = require('./src/routing/filledForms');
const templatesRoute = require('./src/routing/templateForms');
const nativeAuthRoute = require('./src/routing/nativeAuth');
const googleAuthRoute = require('./src/routing/googleAuth')
const registerRoute = require('./src/routing/register');

app.use(cookieSession({
  maxAge:EXPIRY_TIME,
  keys: [COOKIE_KEY]
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(cors());

app.use('/api/forms/templates', templatesRoute);
app.use('/api/forms/filled-forms', filledFormsRoute);
app.use('/api/auth', nativeAuthRoute);
app.use('/api/auth', googleAuthRoute);
app.use('/api/auth', registerRoute);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  connectDb();
});
