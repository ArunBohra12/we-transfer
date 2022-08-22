const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./userModel');

const fileSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  filePassword: {
    type: String,
  },
  // Embed user
  uploadedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
});

fileSchema.pre('save', async function (next) {
  if (this.filePassword) {
    this.filePassword = await bcrypt.hash(this.filePassword, 10);
  }

  // Update User
  const { totalFilesShared } = await User.findById(this.uploadedBy);
  const updatedFileData = {
    totalFilesShared: totalFilesShared + 1,
    $push: { files: this._id },
  };
  await User.findByIdAndUpdate(this.uploadedBy, updatedFileData);

  next();
});

const File = mongoose.model('File', fileSchema);

module.exports = File;
