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
    enum: ['client', 'admin', 'provider'],
    default: 'client'
  },
  validated: {
    type: Boolean,
    default: false
  },  
  phone: String,
  address: String,
  cin: String,
  bio: String,
  photo: String,
  experience: Number,
  services: [String],
  lastActivity: Date, // Date de dernière activité
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  } 
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);