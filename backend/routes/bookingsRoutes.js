const express = require('express');
const router = express.Router();
const Booking = require('../models/BookingModels');

// Créer une réservation
router.post('/', async (req, res) => {
  try {
    const bookingData = req.body;

    // Validation manuelle
    if (!bookingData.service || !bookingData.service.id || !bookingData.service.price) {
      return res.status(400).json({ message: "Les informations du service sont requises" });
    }
    
    if (!bookingData.schedule || !bookingData.schedule.frequency) {
      return res.status(400).json({ message: "La fréquence est requise" });
    }
    
    if (bookingData.schedule.frequency === 'une seule fois' && !bookingData.schedule.selectedDate) {
      return res.status(400).json({ message: "La date est requise pour une réservation ponctuelle" });
    }
    
    if (bookingData.schedule.frequency === 'plusieurs fois par semaine' && 
        (!bookingData.schedule.startDate || !bookingData.schedule.endDate || 
         !bookingData.schedule.selectedDays || bookingData.schedule.selectedDays.length === 0)) {
      return res.status(400).json({ message: "Les dates de début/fin et les jours sont requis pour les réservations répétitives" });
    }

    if (!bookingData.client || !bookingData.client.name || !bookingData.client.email || 
        !bookingData.client.phone || !bookingData.client.address) {
      return res.status(400).json({ message: "Toutes les informations client sont requises" });
    }

    // ✨ Normalisation des dates pour supprimer l'heure
    if (bookingData.schedule.selectedDate) {
      bookingData.schedule.selectedDate = new Date(bookingData.schedule.selectedDate).toISOString().split('T')[0];
    }

    if (bookingData.schedule.startDate) {
      bookingData.schedule.startDate = new Date(bookingData.schedule.startDate).toISOString().split('T')[0];
    }

    if (bookingData.schedule.endDate) {
      bookingData.schedule.endDate = new Date(bookingData.schedule.endDate).toISOString().split('T')[0];
    }

    const newBooking = new Booking(bookingData);
    await newBooking.save();
    
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Récupérer toutes les réservations
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des réservations" });
  }
});

// Stats des réservations
router.get('/stats', async (req, res) => {
  try {
    const total = await Booking.countDocuments();
    const completed = await Booking.countDocuments({ status: 'completed' });
    const inProgress = await Booking.countDocuments({ status: 'in_progress' });
    const cancelled = await Booking.countDocuments({ status: 'cancelled' });
    
    // Calcul du revenu mensuel (exemple simplifié)
    const monthlyRevenue = await Booking.aggregate([
      { 
        $match: { 
          createdAt: { $gte: new Date(new Date().setMonth(new Date().getMonth() - 1)) } 
        } 
      },
      { $group: { _id: null, total: { $sum: "$totalPrice" } } }
    ]);
    
    // Services populaires
    const popularServices = await Booking.aggregate([
      { $group: { _id: "$service.name", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 3 }
    ]);

    res.json({
      total,
      completed,
      inProgress,
      cancelled,
      monthlyRevenue: monthlyRevenue[0]?.total || 0,
      popularServices
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des statistiques" });
  }
});

// Récupérer les dernières réservations en attente (pour les prestataires)
router.get('/last-pending', async (req, res) => {
  try {
    const lastPendingBookings = await Booking.find({ status: 'confirmed' })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('service', 'name description')
      .populate('client', 'name email phone');
      
    res.json(lastPendingBookings);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des réservations en attente" });
  }
});

// Récupérer les dernières réservations
router.get('/last', async (req, res) => {
  try {
    const lastBookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('service', 'name description')
      .populate('client', 'name email phone');
      
    res.json(lastBookings);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des dernières réservations" });
  }
});

router.put('/:id/accept', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id, 
      { status: 'in_progress' }, 
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({ error: 'Réservation non trouvée' });
    }
    res.json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Récupérer une réservation par ID
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Réservation non trouvée" });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de la réservation" });
  }
});

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

// Route spéciale pour marquer une réservation comme "en cours"
router.put('/:id/start', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id, 
      { status: 'in_progress' }, 
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({ error: 'Réservation non trouvée' });
    }
    res.json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route spéciale pour marquer une réservation comme "complétée"
router.put('/:id/complete', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id, 
      { status: 'completed' }, 
      { new: true }
    );
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
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
    
    if (!deletedBooking) {
      return res.status(404).json({ message: "Réservation non trouvée" });
    }
    
    res.json({ message: "Réservation supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de la réservation" });
  }
});

module.exports = router;