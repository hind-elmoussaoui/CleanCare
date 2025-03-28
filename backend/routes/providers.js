const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const Provider = require("../models/Provider.js");

const router = express.Router();

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

// Middleware de gestion des erreurs
const handleErrors = (res, status, message, error = null) => {
    console.error(message, error);
    res.status(status).json({ message, error: error?.message });
};

// Route pour enregistrer un fournisseur
router.post("/register", upload.single("photo"), async (req, res) => {
    console.log("File received:", req.file); // Log le fichier reçu

    const { firstName, lastName, email, phone, address, city, services, experience, password, idCard } = req.body;
   
    try {
        // Vérifie si le prestataire existe déjà
        const existingProvider = await Provider.findOne({ email });
        if (existingProvider) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hash du mot de passe
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crée un nouveau prestataire
        const newProvider = new Provider({
            firstName,
            lastName,
            email,
            phone,
            address,
            city,
            services,
            experience,
            password: hashedPassword,
            idCard,
            photo: req.file ? `/uploads/${req.file.filename}` : null,
        });

        // Enregistre le prestataire dans la base de données
        await newProvider.save();
        console.log("Provider saved successfully:", newProvider); // Log le prestataire enregistré

        // Log le chemin du fichier
        if (req.file) {
            console.log("File saved at:", req.file.path);
        }
        JWT_SECRET="votreSecretKey"

        // Génère un token JWT
        const token = jwt.sign({ id: newProvider._id }, JWT_SECRET, { expiresIn: "1h" });
        console.log("Token generated:", token); // Log le token généré

        // Réponse réussie
        res.status(201).json({
            message: "Provider registered successfully",
            provider: newProvider,
            token,
        });
    } catch (error) {
        console.error("Error in /register route:", error); // Log les erreurs
        if (error.name === "MongoError" && error.code === 11000) {
            return res.status(400).json({ message: "Email already exists" });
        }
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
});


// Route pour connecter un fournisseur
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try { 
        const provider = await Provider.findOne({ email });
        if (!provider) {
        return res.status(400).json({ message: "Email ou mot de passe incorrect" });
        }

        const isMatch = await bcrypt.compare(password, provider.password);
        if (!isMatch) { 
            return res.status(400).json({ message: "Email ou mot de passe incorrect" });
        }

        const token = jwt.sign({ id: provider._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ message: "Connexion réussie", token });
    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

// Route pour obtenir tous les fournisseurs
router.get("/", async (req, res) => {
    try {
        const providers = await Provider.find().select("-password");
        res.status(200).json(providers);
    } catch (error) {
        handleErrors(res, 500, "Error fetching providers", error);
    }
});

// Route pour récupérer les données du prestataire connecté
router.get('/me', async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: "Non autorisé" });
        
        const decoded = jwt.verify(token, "votreSecretKey");
        const provider = await Provider.findById(decoded.id).select('-password');
        
        if (!provider) return res.status(404).json({ message: "Prestataire non trouvé" });
        
        res.json({
            ...provider._doc,
            role: 'provider' // Ajoutez explicitement le rôle
        });
    } catch (error) {
        console.error("Erreur:", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
});

// Route pour activer/désactiver un fournisseur
router.put("/activate/:id", async (req, res) => {
    try {
        const provider = await Provider.findById(req.params.id);
        if (!provider) {
        return res.status(404).json({ message: "Provider not found" });
        }

        // Inverser le statut d'activation
        provider.isActive = !provider.isActive;
        await provider.save();

        res.status(200).json({
            message: `Provider ${provider.isActive ? "activated" : "deactivated"} successfully`,
            provider,
        });
    } catch (error) {
        console.error("Error toggling provider activation:", error);
        res.status(500).json({ message: "Error toggling provider activation", error });
    }
});

// Route pour supprimer un fournisseur
router.delete("/:id", async (req, res) => {
    try {
        const provider = await Provider.findByIdAndDelete(req.params.id);
        if (!provider) {
            return handleErrors(res, 404, "Provider not found");
        }

        res.status(200).json({ message: "Provider deleted successfully" });
    } catch (error) {
        handleErrors(res, 500, "Error deleting provider", error);
    }
});

module.exports = router;