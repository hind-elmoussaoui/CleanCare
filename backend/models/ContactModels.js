const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String },
    service: { type: String, enum: ["Femme de ménage à domicile", "Nounou/Garde d'enfants", "Service de nettoyage professionnel", "Autre demande"], required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Contact", ContactSchema);
