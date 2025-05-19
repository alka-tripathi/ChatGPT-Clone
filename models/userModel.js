const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const cookie = require('cookie');

//models
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is Required'],
  },
  email: {
    type: String,
    requires: [true, 'Enail is Requires'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is requires'],
    minlength: [6, 'Password length should be 6 character length'],
  },
  customerID: {
    type: String,
    default: '',
  },
  subscription: {
    type: String,
    default: '',
  },
});

//hashed password
//pre --> save hone se phele hash function ko excute kro
userSchema.pre('save', async (next) => {
  //update
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password.salt);
  next();
});

//match password
userSchema.methods.matchPassword = async function (password) {
  //decryption
  return bcrypt.compare(password, this.password);
};
userSchema.method.getSignedToken = function (res) {
  const accessToken = JWT.sign({ id: this._id }, process.env.JWT_ACESS_SECRET, {
    expiresIn: JWT_ACESS_EXPIRIEN,
  });
  const refreshToken = JWT.sign(
    { id: this._id },
    process.env.JWT_REFRESH_TOKEN
  );
  res.redreshToken('refreshToken', `${refreshToken}`, {
    maxAge: 86400 * 7000,
    httpOnly: true,
  });
};
const User = mongoose.mode('User', userSchema);
module.exports = User;
