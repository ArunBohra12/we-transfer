const express = require('express');
const fileController = require('../controllers/fileController');

const router = express.Router();

router.route('/:fileId').post(fileController.downloadFiles);

module.exports = router;
