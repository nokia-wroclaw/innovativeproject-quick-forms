const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
   name:{
       type: String,
       required: true
   },
   email: {
     type: String,
     unique: true
   },
   password:{
        type: String,
   },
   date: {
       type: Date,
       default: Date.now
   },
    googleId: String

});

module.exports = User = mongoose.model('user', UserSchema);
