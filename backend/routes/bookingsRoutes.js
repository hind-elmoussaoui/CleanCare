const express = require('express');
const router = express.Router();
const Booking = require('../models/BookingModels');

// Créer une nouvelle réservation
router.post('/', async (req, res) => {
  try {
    // Validation simple
    if (!req.body.service || !req.body.client) {
      return res.status(400).json({ error: 'Données de réservation incomplètes' });
    }

    const booking = new Booking(req.body);
    await booking.save();
    
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Récupérer toutes les réservations
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des réservations' });
  }
});

// Récupérer une réservation par ID
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: 'Réservation non trouvée' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération de la réservation' });
  }
});

// Mettre à jour une réservation
router.put('/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!booking) {
      return res.status(404).json({ error: 'Réservation non trouvée' });
    }
    res.json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Supprimer une réservation
router.delete('/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: 'Réservation non trouvée' });
    }
    res.json({ message: 'Réservation supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression de la réservation' });
  }
});

module.exports = router;