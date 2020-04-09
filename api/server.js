const express = require('express');
require('dotenv').config();
const {COOKIE_KEY} = process.env;
const app = express();
const cors = require('cors');
const passport = require('passport');
const cookieSession = require('cookie-session');
const connectDb = require('./src/connection/connection');
const passportConfig = require('./src/authorization/passport-config')
const filledFormsRoute = require('./src/routing/filledForms');
const templatesRoute = require('./src/routing/templateForms');
const authRoute = require('./src/routing/auth');
const registerRoute = require('./src/routing/register');


const DAY = 24 * 60 * 60 * 1000;

app.use(cookieSession({
  maxAge:DAY,
  keys: [COOKIE_KEY]
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use('/api/forms/templates', templatesRoute);
app.use('/api/forms/filled-forms', filledFormsRoute);
app.use('/api/auth', authRoute);
app.use('/api/auth', registerRoute);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  connectDb();
});
