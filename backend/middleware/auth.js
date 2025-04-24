// auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/UserModels');

module.exports = async (req, res, next) => {
  try {
    // 1. Vérification du header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'Authorization header manquant'
      });
    }

    // 2. Vérifier le format Bearer
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Format Authorization invalide. Utilisez: Bearer <token>'
    });
  }

    // 3. Extraction du token
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Token non fourni' });
    }

    // 3. Vérification du token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 4. Recherche de l'utilisateur
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'Utilisateur non trouvé' });
    }

    // 5. Attachement de l'utilisateur
    req.user = user;
    next();
  } catch (error) {
    console.error('Middleware auth error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Token JWT invalide' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expiré' });
    }
    
    res.status(500).json({ message: 'Erreur d\'authentification' });
  }
};