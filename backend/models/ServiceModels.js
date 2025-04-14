const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  service: {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true }
  },
  schedule: {
    frequency: { 
      type: String, 
      required: true, 
      enum: ['une seule fois', 'plusieurs fois par semaine'] 
    },
    selectedDate: Date,
    startDate: Date,
    endDate: Date,
    selectedDays: [String]
  },
  client: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true }
  },
  notes: String,
  status: { type: String, default: 'confirmed', enum: ['confirmed', 'cancelled', 'completed'] },
  totalPrice: Number,
  createdAt: { type: Date, default: Date.now }
});

// Validation avant sauvegarde
serviceSchema.pre('save', function(next) {
  if (this.schedule.frequency === 'plusieurs fois par semaine') {
    if (!this.schedule.startDate || !this.schedule.endDate || !this.schedule.selectedDays.length) {
      throw new Error('Dates et jours requis pour les services récurrents');
    }
    if (new Date(this.schedule.startDate) > new Date(this.schedule.endDate)) {
      throw new Error('La date de début doit être avant la date de fin');
    }
  } else if (!this.schedule.selectedDate) {
    throw new Error('Date requise pour les services ponctuels');
  }
  next();
});

module.exports = mongoose.model('Service', serviceSchema);