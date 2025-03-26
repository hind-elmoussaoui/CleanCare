const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// Route pour créer une nouvelle commande
router.post("/orders", async (req, res) => {
    try {
        console.log("Données reçues :", req.body); // Vérifie si les données sont reçues
        const newOrder = new Order(req.body);
        await newOrder.save();
        res.status(201).json({ message: "Commande enregistrée avec succès !" });
    } catch (error) {
        console.error("Erreur lors de l'enregistrement de la commande :", error);
        res.status(500).json({ message: "Erreur serveur", error });
    }
});


router.get("/orders", async (req, res) => {
    try {
        console.log("📥 Requête GET reçue sur /orders"); // Log de vérification
        const orders = await Order.find().sort({ createdAt: -1 });
        console.log("📦 Données envoyées :", orders); // Log des données envoyées
        res.status(200).json(orders);
    } catch (error) {
        console.error("❌ Erreur lors de la récupération des commandes :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
});


module.exports = router;
