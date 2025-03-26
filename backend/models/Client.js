// models/client.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Définir le schéma du client
const clientSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 3,
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true, // L'email doit être unique
        match: /^\S+@\S+\.\S+$/, // Validation basique de l'email
    },
    phone: {
        type: String,
        required: true,
        minlength: 10,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        set: password => bcrypt.hashSync(password, 10)
    },
});

// Ajouter une méthode statique pour rechercher un client par email
clientSchema.statics.findByEmail = async function (email) {
    return this.findOne({ email }); // Utilisez `this` pour faire référence au modèle
};

// Exporter le modèle
module.exports = mongoose.model('Client', clientSchema);