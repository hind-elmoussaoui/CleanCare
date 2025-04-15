const express = require('express');
const router = express.Router();
const Avis = require('../models/AvisModels');

// Créer un nouvel avis
router.post('/', async (req, res) => {
  try {
    const newAvis = new Avis(req.body);
    const savedAvis = await newAvis.save();
    res.status(201).json(savedAvis);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Récupérer tous les avis
router.get('/', async (req, res) => {
    try {
      const { status } = req.query;
      let query = {};
      
      if (status && ['pending', 'approved', 'rejected'].includes(status)) {
        query.status = status;
      }
      
      const avis = await Avis.find(query);
      res.json(avis);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

// GET /api/avis/stats
router.get('/stats', async (req, res) => {
    try {
      const avis = await Avis.find({ status: 'approved' });
      
      const total = avis.length;
      const sum = avis.reduce((acc, curr) => acc + curr.rating, 0);
      const average = total > 0 ? (sum / total) : 0;
      
      const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
      avis.forEach(a => {
        const rating = Math.round(a.rating);
        if (rating >= 1 && rating <= 5) {
          distribution[rating]++;
        }
      });
  
      res.json({
        averageRating: average,
        ratingDistribution: distribution,
        totalAvis: total
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

// Récupérer un avis par ID
router.get('/:id', async (req, res) => {
  try {
    const avis = await Avis.findById(req.params.id);
    if (!avis) return res.status(404).json({ message: 'Avis non trouvé' });
    res.json(avis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Mettre à jour un avis
router.put('/:id', async (req, res) => {
  try {
    const updatedAvis = await Avis.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAvis) return res.status(404).json({ message: 'Avis non trouvé' });
    res.json(updatedAvis);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Supprimer un avis
router.delete('/:id', async (req, res) => {
  try {
    const deletedAvis = await Avis.findByIdAndDelete(req.params.id);
    if (!deletedAvis) return res.status(404).json({ message: 'Avis non trouvé' });
    res.json({ message: 'Avis supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Nouvelle route pour approuver/rejeter les avis
router.patch('/:id/status', async (req, res) => {
    try {
      const { status } = req.body;
      const updatedAvis = await Avis.findByIdAndUpdate(
        req.params.id,
        { 
          status,
          approvedAt: status === 'approved' ? Date.now() : null
        },
        { new: true }
      );
      res.json(updatedAvis);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
});
  

module.exports = router;