const express = require("express");
const router = express.Router();
const Service = require("../models/ServiceModels");

// Route pour créer une réservation
router.post("/", async (req, res) => {
    console.log("Données reçues pour la réservation :", req.body);
    const {
        service,
        frequency,
        selectedDate,
        startDate,
        endDate,
        selectedDays,
        name,
        location,
        accommodates,
    } = req.body;

    try {
        const newService = new Service({
            service: {
                name: service.name,
                description: service.description,
                price: Number(service.price) || 0, // Convertir en nombre et mettre une valeur par défaut
            },
            frequency,
            selectedDate,
            startDate,
            endDate,
            selectedDays,
            name,
            location,
            accommodates,
        });

        await newService.save();
        res.status(201).json({ success: true, message: "Réservation créée avec succès", data: newService });
    } catch (error) {
        console.error("Erreur lors de la réservation:", error);
        res.status(500).json({ success: false, message: "Erreur lors de la création de la réservation" });
    }
console.log("Service reçu :", service);
console.log("Nom :", service?.name);
console.log("Description :", service?.description);
console.log("Prix :", service?.price);

});

router.get("/", async (req, res) => {
    try {
        const reservations = await Service.find();
        res.status(200).json({ success: true, data: reservations });
    } catch (error) {
        console.error("Erreur lors de la récupération des réservations:", error);
        res.status(500).json({ success: false, message: "Erreur lors de la récupération des réservations" });
    }
});


module.exports = router;
