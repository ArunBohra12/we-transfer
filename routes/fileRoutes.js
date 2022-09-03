const express = require('express');
const authController = require('../controllers/authController');
const fileController = require('../controllers/fileController.js');

const router = express.Router();

router
  .route('/')
  .get(authController.protect, fileController.getAllUploadedFiles)
  .post(authController.protect, fileController.uploadFile, fileController.saveFile);

module.exports = router;
