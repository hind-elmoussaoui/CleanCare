const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    address: { type: String },
    city: { type: String },
    services: { type: [String], default: [] },
    experience: { type: String },
    password: { type: String, required: true },
    idCard: { type: String },
    photo: { type: String },
    bio: { type: String },
    cin: { type: String },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Provider', providerSchema);