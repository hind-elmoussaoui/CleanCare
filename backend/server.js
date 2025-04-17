// Charger les variables d'environnement
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require("path");

const bookingRoutes = require('./routes/bookingsRoutes');
const contactRoutes = require('./routes/contactsRoutes');
const orderRoutes = require('./routes/ordersRoutes');
const providerRoutes = require('./routes/providersRoutes');
const clientRouter = require('./routes/clientsRoutes');
const adminRoutes = require('./routes/adminsRoutes');
const usersRoutes = require('./routes/userRoutes');
const avisRoutes = require('./routes/avisRoutes');

const app = express();

// 🔹 Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use("/uploads", express.static("uploads"));
MONGO_URI="mongodb+srv://hindelmoussaoui:hindelmoussaoui@cluster0.omwqk.mongodb.net/CleanCare?retryWrites=true&w=majority"

// 🔹 Connexion à MongoDB
// mongoose.connect(process.env.MONGO_URI)
mongoose.connect(MONGO_URI)
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => {
    console.error('❌ Failed to connect to MongoDB', err.message);
    process.exit(1);
});

// 🔹 Routes
app.use('/api/bookings', bookingRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api', orderRoutes);
app.use('/api/providers', providerRoutes);
app.use('/api/clients', clientRouter);
app.use('/api/admin', adminRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/avis', avisRoutes);

// 🔹 Gestion des erreurs globales
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Servir les fichiers statiques depuis le dossier 'uploads'
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 🔹 Démarrage du serveur
const PORT = process.env.PORT || 5000; // Utiliser la variable d'environnement PORT
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
}); 