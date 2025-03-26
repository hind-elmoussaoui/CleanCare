const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    idCard: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    services: { type: String, required: true },
    experience: { type: Number, required: true },
    password: { type: String, required: true },
    photo: { type: String, required: true }, // Chemin du fichier photo
});

module.exports = mongoose.model("Provider", providerSchema);