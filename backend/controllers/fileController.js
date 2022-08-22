const multer = require('multer');
const path = require('node:path');
const fs = require('node:fs');
const File = require('../models/fileModel');
const catchAsync = require('../utils/catchAsync');

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

exports.saveFile = catchAsync(async (req, res) => {
  let fileName;
  if (req.file) fileName = req.file.filename;

  const fileData = {
    fileName,
    uploadedBy: req.user._id,
  };

  if (req.body.filePassword) fileData.filePassword = req.body.filePassword;

  const file = await File.create(fileData);

  res.status(201).json({
    status: 'success',
    data: {
      file,
    },
  });
});

exports.getAllUploadedFiles = catchAsync(async (req, res) => {
  const files = await File.find({ user: req.user._id }).populate('uploadedBy', ['name', 'email']);

  res.status(200).json({
    status: 'success',
    data: {
      files,
    },
  });
});
