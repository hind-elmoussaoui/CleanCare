const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    service: {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
    },
    frequency: { type: String, required: true },
    selectedDate: { type: Date },
    startDate: { type: Date },
    endDate: { type: Date },
    selectedDays: [{ type: String }],
    name: { type: String, required: true },
    location: { type: String, required: true },
    accommodates: { type: Number, required: true },
});

module.exports = mongoose.model('Booking', BookingSchema);