const express = require('express');
const jwt = require('jsonwebtoken');
const Admin = require('../models/AdminModels');
const User = require('../models/UserModels');
const router = express.Router();

// Constantes pour le premier admin
const INITIAL_ADMIN_EMAIL = "hind6ah@gmail.com";
const INITIAL_ADMIN_PASSWORD = "admin@123"; // Mot de passe en clair

// Vérifier et créer le premier admin au démarrage
async function createInitialAdmin() {
  try {
    const adminExists = await Admin.findOne({ email: INITIAL_ADMIN_EMAIL });
    if (!adminExists) {
      await Admin.create({
        email: INITIAL_ADMIN_EMAIL,
        password: INITIAL_ADMIN_PASSWORD // Stockage en clair
      });
      console.log('Admin initial créé avec succès');
    }
  } catch (error) {
    console.error('Erreur lors de la création du admin initial:', error);
  }
}

createInitialAdmin();

// Route de connexion admin (sans bcrypt)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  // Nettoyage des inputs
  const cleanEmail = email?.trim()?.toLowerCase();
  const cleanPassword = password?.trim();

  try {
    const admin = await Admin.findOne({ email: cleanEmail });
    
    if (!admin) {
      return res.status(401).json({ 
        message: 'Email ou mot de passe incorrect',
        details: 'Admin non trouvé'
      });
    }

    if (cleanPassword !== admin.password) {
      return res.status(401).json({ 
        message: 'Email ou mot de passe incorrect',
        details: 'Mot de passe ne correspond pas'
      });
    }

    const token = jwt.sign(
      { 
        userId: admin._id,
        userType: 'admin' 
      },
      'votre-secret-key',
      { expiresIn: '1h' }
    );

    res.json({ 
      message: 'Connexion réussie',
      token,
      userType: 'admin'
    });

  } catch (error) {
    console.error('Erreur de connexion:', {
      error: error.message,
      stack: error.stack
    });
    res.status(500).json({ 
      message: 'Erreur serveur',
      error: error.message 
    });
  }
});

// Ajoutez cette route pour réinitialiser l'admin
router.post('/reset-admin', async (req, res) => {
  await Admin.deleteOne({ email: INITIAL_ADMIN_EMAIL });
  await Admin.create({
    email: INITIAL_ADMIN_EMAIL,
    password: INITIAL_ADMIN_PASSWORD
  });
  res.json({ message: 'Admin réinitialisé' });
});

// Ajoutez ce code temporairement avant la route de login pour vérifier
router.get('/check-admin', async (req, res) => {
  const admin = await Admin.findOne({ email: INITIAL_ADMIN_EMAIL });
  res.json(admin || { message: 'Admin non trouvé' });
}); 

// Créer un nouvel utilisateur (sans cryptage)
router.post('/users', async (req, res) => {
  try {
    const { email, password, name, role } = req.body;
    
    // Validation du rôle
    const validRoles = ['admin', 'provider', 'client'];
    if (role && !validRoles.includes(role)) {
      return res.status(400).json({ message: 'Rôle invalide' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Un utilisateur avec cet email existe déjà' });
    }

    const newUser = await User.create({
      email,
      password: password, // Stockage en clair
      name,
      role: role || 'client' // Par défaut 'client'
    });

    res.status(201).json({
      message: 'Utilisateur créé avec succès',
      user: {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur lors de la création de l\'utilisateur' });
  }
});

// Les autres routes (GET, DELETE) restent identiques
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Mettre à jour un utilisateur (sans cryptage automatique)
router.put('/users/:id', async (req, res) => {
  try {
    const { name, email, role, password } = req.body;
    const updateData = { name, email, role };

    // Si le mot de passe est fourni, le stocker en clair
    if (password) {
      updateData.password = password;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, select: '-password' }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.json({
      message: 'Utilisateur mis à jour avec succès',
      user: updatedUser
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id, '-password');
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

router.delete('/users/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

//ajouter user to a collection 
//get user from the collection into dashboard
module.exports = router;


