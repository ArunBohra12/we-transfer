const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.getCurrentUserFiles = catchAsync(async (req, res) => {
  const user = await User.findById(req.user._id).select('files').populate('files');

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});
