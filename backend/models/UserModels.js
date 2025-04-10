const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'provider'],
    default: 'user'
  },
  phone: String,
  address: String,
  cin: String,
  bio: String,
  photo: String,
  experience: Number,
  services: [String]
});

module.exports = mongoose.model('User', UserSchema);