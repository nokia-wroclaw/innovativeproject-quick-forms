const express = require('express');
require('dotenv').config();
const app = express();
const router = express.Router();
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const connectDb = require('./src/connection/connection');
const passportGoogleStrategy = require('./src/authentication/passportGoogleStrategy');
const filledFormsRoute = require('./src/routing/filledForms');
const templatesRoute = require('./src/routing/templateForms');
const pendingFormsRoute = require('./src/routing/pendingForms');
const nativeAuthRoute = require('./src/routing/nativeAuth');
const googleAuthRoute = require('./src/routing/googleAuth');
const registerRoute = require('./src/routing/register');

const corsOptions = {
  origin: ['http://localhost:3000'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Access-Control-Allow-Methods',
    'Access-Control-Request-Headers',
    'Access-Control-Allow-Origin',
  ],
  credentials: true,
  enablePreflight: false,
};
app.use(cors(corsOptions));
app.use(passport.initialize());
app.use(cookieParser());


app.use('/api/forms/templates', templatesRoute);
app.use('/api/forms/templates/file', templatesRoute);
app.use('/api/forms/templates/user', templatesRoute);
app.use('/api/forms/filled-forms', filledFormsRoute);
app.use('/api/forms/filled-forms/single', filledFormsRoute);
app.use('/api/forms/pendingforms', pendingFormsRoute);
app.use('/api/forms/pendingforms/single', pendingFormsRoute);
app.use('/api/auth', nativeAuthRoute);
app.use('/api/auth', googleAuthRoute);
app.use('/api/auth', registerRoute);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  connectDb();
});
