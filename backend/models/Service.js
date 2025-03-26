const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
    service: {
        name: String,
        description: String,
        price: Number,
    },
    frequency: {
        type: String,
        enum: ["une seule fois", "plusieurs fois par semaine"],
        required: true,
    },
    selectedDate: Date,
    startDate: Date,
    endDate: Date,
    selectedDays: [String],
    name: String,
    location: String,
    accommodates: Number,
}, { timestamps: true });

const Service = mongoose.model("Service", ServiceSchema);

module.exports = Service;
