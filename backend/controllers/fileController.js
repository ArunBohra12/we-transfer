const path = require('node:path');
const fs = require('node:fs');
const multer = require('multer');
const File = require('../models/fileModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDirectory = path.join(__dirname, '../', '/uploads');

    if (!fs.existsSync(uploadDirectory)) {
      fs.mkdirSync(uploadDirectory);
    }

    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const fileName = `user-${req.user.id}-${Date.now()}-${file.originalname}`;

    cb(null, fileName);
  },
});

const upload = multer({
  storage: multerStorage,
});

exports.uploadFile = upload.single('file');

exports.saveFile = catchAsync(async (req, res, next) => {
  if (!req.file) return next(new AppError("Can't process the uploaded file.", 409));

  const fileData = {
    uploadedBy: req.user._id,
    fileName: req.file.filename,
    originalName: req.file.originalname,
  };

  if (req.body.filePassword) fileData.filePassword = req.body.filePassword;

  const file = await File.create(fileData);

  res.status(201).json({
    status: 'success',
    data: {
      filePath: file.filePath,
    },
  });
});

exports.getAllUploadedFiles = catchAsync(async (req, res) => {
  const files = await File.find({
    user: req.user._id,
  })
    .select('filePath')
    .populate('uploadedBy', ['name', 'email']);

  res.status(200).json({
    status: 'success',
    data: {
      files,
    },
  });
});

exports.downloadFiles = catchAsync(async (req, res, next) => {
  if (!req.params.fileId) next(new AppError('Invalid url for downloading file.', 400));

  const file = await File.findById(req.params.fileId).select('+filePassword');

  // TODO:
  // If a user is logged in. He should not be asked for password for any of his uploaded files

  if (!file.filePassword) {
    return res.download(`uploads/${file.fileName}`, file.originalName);
  }

  const password = req.body.filePassword;

  if (!password) {
    return res.send('This is a protected file. Provide a password to download.');
  }

  if (file.filePassword) {
    if (await file.confirmPassword(password, file.filePassword)) {
      return res.download(`uploads/${file.fileName}`, file.originalName);
    }

    return res.send('Wrong Password. Please try again.');
  }
});
