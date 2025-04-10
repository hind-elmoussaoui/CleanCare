// routes/client.js
const express = require('express');
const Client = require('../models/ClientModels'); // Assurez-vous que le chemin est correct
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/', async (req, res) => {
    try {
        const clients = await Client.find(); // Utilisez `find` pour récupérer tous les clients
        res.status(200).json(clients);
    } catch (error) {
        console.error("Erreur lors de la récupération des clients:", error);
        res.status(500).json({ message: "Erreur lors de la récupération des clients." });
    }
});


// Ajoutez cette route pour récupérer les données du client connecté
router.get('/me', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: "Non autorisé" });
        
        const decoded = jwt.verify(token, "votreSecretKey");
        const client = await Client.findById(decoded.id).select('-password');
        
        if (!client) return res.status(404).json({ message: "Client non trouvé" });
        
        res.json({
            ...client._doc,
            role: 'client' // Ajoutez explicitement le rôle
        });
    } catch (error) {
        console.error("Erreur:", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

// Mettre à jour le profil client
router.put('/profile', async (req, res) => {
  try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) return res.status(401).json({ message: "Non autorisé" });

      const decoded = jwt.verify(token, "votreSecretKey");
      const { phone, address, cin } = req.body;

      const updatedClient = await Client.findByIdAndUpdate(
          decoded.id,
          { phone, address, cin },
          { new: true }
      ).select('-password');

      res.json(updatedClient);
  } catch (error) {
      console.error("Erreur:", error);
      res.status(500).json({ message: "Erreur serveur" });
  }
});

// Récupérer un client spécifique (pour admin)
router.get('/:id', async (req, res) => {
  try {
      const client = await Client.findById(req.params.id).select('-password');
      if (!client) return res.status(404).json({ message: "Client non trouvé" });
      
      res.json(client);
  } catch (error) {
      console.error("Erreur:", error);
      res.status(500).json({ message: "Erreur serveur" });
  }
}); 

module.exports = router;