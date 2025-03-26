const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// 🟢 Ajouter un message de contact
router.post("/", async (req, res) => {
    try {
        const { name, email, subject, service, message } = req.body;

        const newContact = new Contact({
            name,
            email,
            subject,
            service,
            message,
        });

        await newContact.save();
        res.status(201).json({ message: "Message envoyé avec succès !" });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de l'envoi du message" });
    }
});

// 🟢 Récupérer tous les messages
router.get("/", async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la récupération des messages" });
    }
});

// 🟢 Supprimer un message
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await Contact.findByIdAndDelete(id);
        res.status(200).json({ message: "Message supprimé avec succès !" });
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la suppression du message" });
    }
});

module.exports = router;
