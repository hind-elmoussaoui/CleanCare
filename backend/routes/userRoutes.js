const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModels');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require("fs");

// Inscription utilisateur (sans cryptage)
router.post('/register', async (req, res) => {

  const { email, password, name, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "Tous les champs sont obligatoires" });
  }
  try {
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Un utilisateur avec cet email existe déjà' });
    }

    const newUser = await User.create({
      email,
      password: password, // Stockage direct sans cryptage
      name,
      role
    });

    const token = jwt.sign(
      { 
        userId: newUser._id,
        userType: newUser.role
      },
      process.env.JWT_SECRET || 'votre-secret-key',
      { expiresIn: '1h' }
    );

    res.status(201).json({
      message: 'Inscription réussie',
      token,
      user: {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur lors de l\'inscription' });
  }
});

// Connexion utilisateur (sans cryptage)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    // Comparaison directe sans bcrypt
    if (password !== user.password) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    const token = jwt.sign(
      { 
        userId: user._id,
        userType: user.role === 'admin' ? 'admin' : 'user' 
      },
      process.env.JWT_SECRET || 'votre-secret-key',
      { expiresIn: '1h' }
    );

    res.json({ 
      message: 'Connexion réussie',
      token,
      userType: user.role === 'admin' ? 'admin' : 'user',
      userId: user._id,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Récupérer le profil de l'utilisateur connecté
router.get('/me', async (req, res) => {
  try {
    // Vérifier l'authentification
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Non autorisé' });
    }

    // Décoder le token pour obtenir l'ID utilisateur
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId, '-password');

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Configuration de Multer pour le téléchargement de fichiers
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Stocke les fichiers dans le dossier 'uploads'
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nom unique pour le fichier
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limite de 5MB
});
 

router.post("/profile", async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    user.phone = req.body.phone;
    user.address = req.body.address;
    user.cin = req.body.cin;
    user.bio = req.body.bio;
    user.photo = req.body.photo;
    user.experience = req.body.experience;
    user.services = req.body.services;

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la mise à jour du profil" });
  }
});

// Route pour obtenir tous les fournisseurs
router.get("/", async (req, res) => {
    try {
        const user = await User.find().select("-password");
        res.status(200).json(user);
    } catch (error) {
        handleErrors(res, 500, "Error fetching user", error);
    }
});

// Mettre à jour le mot de passe
router.put('/update-password', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Non autorisé' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { currentPassword, newPassword } = req.body;

    // Validation des champs
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Les deux champs de mot de passe sont obligatoires' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'Le nouveau mot de passe doit contenir au moins 6 caractères' });
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Vérifier l'ancien mot de passe (comparaison directe sans bcrypt dans votre cas)
    if (currentPassword !== user.password) {
      return res.status(401).json({ message: 'Mot de passe actuel incorrect' });
    }

    // Mettre à jour le mot de passe
    user.password = newPassword;
    await user.save();

    res.json({ message: 'Mot de passe mis à jour avec succès' });

  } catch (error) {
    console.error(error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Token invalide' });
    }
    res.status(500).json({ message: 'Erreur serveur lors de la mise à jour du mot de passe' });
  }
});

router.post('/test-upload', upload.single('photo'), (req, res) => {
  console.log('Fichier reçu:', req.file);
  console.log('Corps de la requête:', req.body);
  res.json({
    file: req.file,
    body: req.body
  });
});

module.exports = router;