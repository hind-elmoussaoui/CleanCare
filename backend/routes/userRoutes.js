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

router.put("/profile", upload.single('photo'), async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Non autorisé' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Mise à jour des champs
    user.phone = req.body.phone || user.phone;
    user.address = req.body.address || user.address;
    user.cin = req.body.cin || user.cin;
    user.bio = req.body.bio || user.bio;

    // Mise à jour des champs spécifiques aux prestataires
    if (user.role === 'provider') {
      user.experience = req.body.experience || user.experience;
      user.services = req.body.services 
        ? (typeof req.body.services === 'string' ? JSON.parse(req.body.services) : req.body.services)
        : user.services;
    }

    // Gestion de la photo
    if (req.file) {
      if (user.photo) {
        const oldPath = path.join(__dirname, '../uploads', user.photo);
        fs.unlink(oldPath, (err) => {
          if (err) console.error('Erreur suppression photo:', err);
        });
      }
      user.photo = req.file.filename;
    }

    const updatedUser = await user.save();
    
    // Retourner l'utilisateur complet sans le mot de passe
    const userToReturn = updatedUser.toObject();
    delete userToReturn.password;
    
    res.status(200).json(userToReturn);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: "Erreur lors de la mise à jour",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

router.get('/profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Non autorisé' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Ajouter l'URL complète de la photo si elle existe
    const userObj = user.toObject();
    if (user.photo) {
      userObj.photoUrl = `http://localhost:5000/uploads/${user.photo}`;
    }

    res.json(userObj);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

router.get('/stats', async (req, res) => {
  try {
    // Statistiques pour les clients normaux
    const clientStats = await User.aggregate([
      { $match: { role: 'client' } },
      {
        $facet: {
          total: [{ $count: 'count' }],
          active: [
            { 
              $match: { 
                lastActivity: { $gte: new Date(Date.now() - 30*24*60*60*1000) }
              }
            },
            { $count: 'count' }
          ],
          newThisMonth: [
            { 
              $match: { 
                createdAt: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) }
              }
            },
            { $count: 'count' }
          ]
        }
      }
    ]);

    // Statistiques pour les providers
    const providerStats = await User.aggregate([
      { $match: { role: 'provider' } },
      {
        $facet: {
          total: [{ $count: 'count' }],
          active: [
            { 
              $match: { 
                lastActivity: { $gte: new Date(Date.now() - 30*24*60*60*1000) }
              }
            },
            { $count: 'count' }
          ],
          newThisMonth: [
            { 
              $match: { 
                createdAt: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) }
              }
            },
            { $count: 'count' }
          ]
        }
      }
    ]);

    const getCount = (stats, key) => stats[0][key][0]?.count || 0;

    res.json({
      clients: {
        total: getCount(clientStats, 'total'),
        active: getCount(clientStats, 'active'),
        newThisMonth: getCount(clientStats, 'newThisMonth')
      },
      providers: {
        total: getCount(providerStats, 'total'),
        active: getCount(providerStats, 'active'),
        newThisMonth: getCount(providerStats, 'newThisMonth')
      },
      combined: {
        total: getCount(clientStats, 'total') + getCount(providerStats, 'total'),
        active: getCount(clientStats, 'active') + getCount(providerStats, 'active'),
        newThisMonth: getCount(clientStats, 'newThisMonth') + getCount(providerStats, 'newThisMonth')
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}); 

// GET /api/users/:id - Récupère un utilisateur spécifique
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Dans votre backend (api/users.js)
// GET /api/users
router.get('/', async (req, res) => {
  try {
    const { role, validated } = req.query;
    const filter = {};

    if (role) filter.role = role;

    if (validated !== undefined) {
      // Convertir validated à Boolean
      if (validated === 'true') filter.validated = true;
      else if (validated === 'false') filter.validated = false;
    }

    const users = await User.find(filter);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
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

// Dans votre fichier de routes users (backend)
router.patch('/validate/:id',  async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { validated: req.body.validated },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Mettre à jour les informations de base du profil (nom et email)
router.put('/update-profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Non autorisé' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { name, email } = req.body;

    // Validation des champs
    if (!name || !email) {
      return res.status(400).json({ message: 'Le nom et l\'email sont obligatoires' });
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Vérifier si l'email est déjà utilisé par un autre utilisateur
    if (email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Cet email est déjà utilisé par un autre compte' });
      }
    }

    // Mettre à jour les informations
    user.name = name;
    user.email = email;
    
    const updatedUser = await user.save();

    // Retourner l'utilisateur mis à jour sans le mot de passe
    const userToReturn = updatedUser.toObject();
    delete userToReturn.password;
    
    res.json({ 
      message: 'Profil mis à jour avec succès',
      user: userToReturn
    });

  } catch (error) {
    console.error(error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Token invalide' });
    }
    res.status(500).json({ message: 'Erreur serveur lors de la mise à jour du profil' });
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

module.exports = router;