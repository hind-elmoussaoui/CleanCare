const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  service: {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true }
  },
  schedule: {
    frequency: { type: String, required: true, enum: ['une seule fois', 'plusieurs fois par semaine'] },
    selectedDate: { type: Date },
    startDate: { type: Date },
    endDate: { type: Date },
    selectedDays: [{ type: String }]
  },
  client: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true }
  },
  notes: { type: String },
  status: { type: String, default: 'confirmed', enum: ['confirmed', 'cancelled', 'completed'] },
  totalPrice: Number,
  createdAt: { type: Date, default: Date.now }
});

// Validation pour les réservations récurrentes
bookingSchema.pre('save', function(next) {
  if (this.schedule.frequency === 'plusieurs fois par semaine') {
    if (!this.schedule.startDate || !this.schedule.endDate || this.schedule.selectedDays.length === 0) {
      throw new Error('Pour les réservations récurrentes, les dates de début/fin et les jours sont requis');
    }
    if (new Date(this.schedule.startDate) > new Date(this.schedule.endDate)) {
      throw new Error('La date de début doit être avant la date de fin');
    }
  } else if (this.schedule.frequency === 'une seule fois' && !this.schedule.selectedDate) {
    throw new Error('Pour une réservation unique, une date est requise');
  }
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);