const { signJwt, verifyJwt } = require('../utils/jwt');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const createAndSendToken = (user, statusCode, res) => {
  const token = signJwt(user._id);

  // Remove password from the output
  user.password = undefined;

  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    // httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res) => {
  const { name, email, password, passwordConfirm } = req.body;

  const userData = { name, email, password, passwordConfirm };
  const user = await User.create(userData);

  user.password = undefined;
  user.isVerified = undefined;

  createAndSendToken(user, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide both email and password', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.confirmPasswords(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  createAndSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let bearerToken = '';

  if (req.headers.authorization?.startsWith('Bearer') && req.headers.authorization.split(' ')[1]) {
    bearerToken = req.headers.authorization.split(' ')[1];
  }

  if (!bearerToken) {
    next(new AppError('You are not logged in. Please login to get access', 401));
  }

  const decodedToken = await verifyJwt(bearerToken);

  // check if user exists
  const user = await User.findById(decodedToken.id);

  if (!user) {
    next(new AppError('User belonging to this token does no longer exists', 401));
  }

  req.user = user;
  next();
});
