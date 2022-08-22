const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tells us your name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minLength: [8, 'Password should be at least 8 characters long'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    validate: {
      validator: function (password) {
        return this.password === password;
      },
      message: 'Passwords do not match',
    },
  },
  totalFilesShared: {
    type: Number,
    default: 0,
  },
  files: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'File',
    },
  ],
  isVerified: {
    type: Boolean,
    default: false,
    select: false,
  },
  emailVerificationToken: String,
});

userSchema.methods.confirmPasswords = async function (inputPassword, userPassword) {
  return await bcrypt.compare(inputPassword, userPassword);
};

// Middlewares

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);

  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
