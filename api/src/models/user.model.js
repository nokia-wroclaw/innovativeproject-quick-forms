const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
   name:{
       type: String,
   },
   email: {
     type: String,
       required:true,
       unique:true
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
