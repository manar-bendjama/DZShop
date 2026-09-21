import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoutes from './Routes/auth.js'
import authMiddleware from './Middlware/authMiddleware.js'
import adminMiddleware from './Middlware/adminMiddleware.js'

dotenv.config()

mongoose.connect(process.env.MONGO_URI)
  .then(function () {
    console.log('MongoDB connecté')
  })
  .catch(function (error) {
    console.log('Erreur MongoDB :', error)
  })

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes)

let produits = [
  { id: 1, nom: "Casque Bluetooth", prix: 4500, categorie: "Audio", stock: 12 },
  { id: 2, nom: "Souris sans fil", prix: 2200, categorie: "Accessoires", stock: 30 },
  { id: 3, nom: "Clavier mécanique", prix: 7800, categorie: "Accessoires", stock: 8 },
  { id: 4, nom: "Webcam HD", prix: 3900, categorie: "Vidéo", stock: 15 },
  { id: 5, nom: "Enceinte portable", prix: 5600, categorie: "Audio", stock: 0 },
  { id: 6, nom: "Câble USB-C", prix: 800, categorie: "Accessoires", stock: 50 },
];

app.get('/api/test-protected', authMiddleware, function (req, res) {
  res.json({ message: 'API Shop en ligne' });
});


app.get('/api/products', function (req, res) {
  res.json(produits);
});

app.get('/api/products/:id', function (req, res) {
  const p = produits.find(function (x) { return x.id === Number(req.params.id); });
  if (!p) return res.status(404).json({ message: 'Introuvable' });
  res.json(p);
});

app.get('/api/products', function(req,res){
     const {categorie} = req.query;
      if (categorie) {
    const filtres = produits.filter(function (p) { return p.categorie === categorie; });
    return res.json(filtres);
  }
  res.json(produits);
});

app.post('/api/products', authMiddleware, adminMiddleware, function (req, res) {
  const nouveau = { id: Date.now(), ...req.body };
   if (req.body.stock === undefined || req.body.stock < 0) {
    return res.status(400).json({ message: 'Stock invalide ou manquant' });
  }
  produits.push(nouveau);
  res.status(201).json(nouveau);
});

app.put('/api/products/:id', function (req, res) {
  const p = produits.find(function (x) { return x.id === Number(req.params.id); });
  if (!p) return res.status(404).json({ message: 'Introuvable' });
  p.nom = req.body.nom || p.nom;
  p.prix = req.body.prix || p.prix;
  res.json(p);
});

app.delete('/api/products/:id', function (req, res) {
  produits = produits.filter(function (x) { return x.id !== Number(req.params.id); });
  res.json({ message: 'Supprimé' });
});

app.listen(5000, function () {
  console.log('Serveur sur http://localhost:5000');
});