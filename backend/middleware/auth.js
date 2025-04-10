// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/UserModels');

module.exports = async function(req, res, next) {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'votre-secret-key');
    const user = await User.findOne({
      _id: decoded.userId,
      'tokens.token': token
    });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Please authenticate' });
  }
};