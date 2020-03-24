const express = require('express');

const app = express();
const cors = require('cors');
const connectDb = require('./src/connection/connection');
const filledFormsRoute = require('./src/routing/filledForms');
const prototypesRoute = require('./src/routing/prototypes');
// const auth = require('./src/auth');

app.use(cors());
app.use('/api/forms/prototypes', filledFormsRoute);
app.use('/api/forms/filled-forms', prototypesRoute);
// app.use('/api/signin', auth);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  connectDb();
});
