const mongoose = require('mongoose');

const avisSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  comment: { type: String, required: true },
  rating: { 
    type: Number, 
    required: true,
    min: 1,
    max: 5,
    validate: {
      validator: Number.isInteger,
      message: 'La note doit être un entier entre 1 et 5'
    }
  },
  city: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'], 
    default: 'pending' 
  },
  createdAt: { type: Date, default: Date.now },
  approvedAt: { type: Date }
});

module.exports = mongoose.model('Avis', avisSchema);