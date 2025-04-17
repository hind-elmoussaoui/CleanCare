const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  service: {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    icon: String
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
  totalPrice: { type: Number, required: true },
  status: { 
    type: String, 
    default: 'pending',
    enum: [ 'pending', 'confirmed', 'in_progress', 'completed', 'cancelled'] 
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Middleware pour calculer le prix avant sauvegarde
bookingSchema.pre('save', function(next) {
  if (this.schedule.frequency === 'une seule fois') {
    this.totalPrice = this.service.price;
  } else {
    const start = this.schedule.startDate;
    const end = this.schedule.endDate;
    const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    const weeks = Math.ceil(diffDays / 7);
    this.totalPrice = weeks * this.schedule.selectedDays.length * this.service.price;
  }
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);