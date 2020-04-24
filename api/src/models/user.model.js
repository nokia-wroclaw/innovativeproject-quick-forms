const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    unique: false,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    trim: true,
  },
  role: {
    type: String,
    trim: true,
    default: 'USER',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  googleId: String,
});

module.exports = User = mongoose.model('user', UserSchema);
