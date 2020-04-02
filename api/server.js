const express = require('express');

const app = express();
const cors = require('cors');
const connectDb = require('./src/connection/connection');
const filledFormsRoute = require('./src/routing/filledForms');
const templatesRoute = require('./src/routing/templateForms');
const auth = require('./src/authorization/auth');
const users = require('./src/routing/users');

app.use(cors());
app.use('/api/forms/templates', templatesRoute);
app.use('/api/forms/filled-forms', filledFormsRoute);
app.use('/api/auth', auth);
app.use('/api/users', users);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  connectDb();
});
