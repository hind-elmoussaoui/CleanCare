const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    notes: { type: String },
    plan: {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        features: [{ type: String }],
        unavailable: [{ type: String }],
    },
    orderDate: { type: Date, default: Date.now } // ✅ Ajout de la date de commande
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
