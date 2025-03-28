// routes/client.js
const express = require('express');
const Client = require('../models/Client'); // Assurez-vous que le chemin est correct
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Route pour l'inscription des clients
router.post('/register', async (req, res) => {
    console.log("Données reçues:", req.body); // Log les données reçues

    const { firstName, lastName, email, phone, password } = req.body;

    // Vérifier si l'email existe déjà
    try {
        const existingClient = await Client.findByEmail(email);
        if (existingClient) {
            console.log("Email déjà utilisé:", email); // Log l'email déjà utilisé
            return res.status(400).json({ message: "Cet email est déjà utilisé." });
        }

        // Créer un nouveau client
        const newClient = await Client.create({ firstName, lastName, email, phone, password });
        console.log("Nouveau client créé:", newClient); // Log le nouveau client
        res.status(201).json({ message: "Inscription réussie !", client: newClient });
    } catch (error) {
        console.error("Erreur lors de la création du client:", error); // Log l'erreur
        res.status(500).json({ message: "Erreur lors de l'inscription." });
    }
});

// Route pour récupérer tous les clients
router.get('/', async (req, res) => {
    try {
        const clients = await Client.find(); // Utilisez `find` pour récupérer tous les clients
        res.status(200).json(clients);
    } catch (error) {
        console.error("Erreur lors de la récupération des clients:", error);
        res.status(500).json({ message: "Erreur lors de la récupération des clients." });
    }
});

router.post('/login', async (req, res) => {
    console.log("Tentative de connexion avec:", req.body);
    
    try {
        const { email, password } = req.body;
    
      // 1. Trouver l'utilisateur
        const client = await Client.findOne({ email });
        if (!client || !password) {
            console.log("Email non trouvé:", email);
            return res.status(400).json({ 
                message: "Email ou mot de passe requis", 
                details: {
                email: !email ? "Manquant" : "Valide",
                password: !password ? "Manquant" : "Valide"
            } });
        }

      // 2. Vérifier le mot de passe
        const isMatch = await bcrypt.compare(password, client.password);
        if (!isMatch) {
            console.log("Mot de passe incorrect pour:", email);
            return res.status(400).json({ 
                message: "Email ou mot de passe incorrect",
                details: "Mot de passe incorrect"
            });
        }

      // 3. Générer le token
      const token = jwt.sign({ id: client._id, role: 'client' }, "votreSecretKey", { expiresIn: '1h' });
      
      console.log("Connexion réussie pour:", email);
      res.json({ 
        token,
        user: {
          id: client._id,
          firstName: client.firstName,
          lastName: client.lastName,
          email: client.email, 
          phone: client.phone,
          role: 'client'
        }
      });
  
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      res.status(500).json({ message: "Erreur serveur" });
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

module.exports = router;