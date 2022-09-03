const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./userModel');

const fileSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  filePath: String,
  originalName: String,
  filePassword: {
    type: String,
    select: false,
  },
  // Embed user
  uploadedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

fileSchema.methods.confirmPassword = async (inputPassword, originalPassword) =>
  await bcrypt.compare(inputPassword, originalPassword);

fileSchema.pre('save', async function (next) {
  this.filePath = `file/${this._id}`;

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
