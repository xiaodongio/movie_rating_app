const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const UserSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

UserSchema.pre('save', function (next) {
  const user = this;
  bcryptjs.genSalt(10, (err, salt) => {
    if (err) {
      throw next(err);
    }
    bcryptjs.hash(user.password, salt, (error, hash) => {
      if (error) {
        throw next(error);
      }
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.getUserByEmail = (email, cb) => {
  this.findOne({ email }, cb);
};

UserSchema.static('getUserByEmail', function (email, cb) {
  this.findOne({ email }, cb);
});

UserSchema.static('comparePassword', (candidatePassword, hash, callback) => {
  bcryptjs.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
});


const User = mongoose.model('user', UserSchema);
module.exports = User;
