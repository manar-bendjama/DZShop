import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoutes from './Routes/auth.js'
import productRoutes from './Routes/products.js'
import orderRoutes from './Routes/orders.js'
import authMiddleware from './Middlware/authMiddleware.js'

dotenv.config()

// Sans phrase secrète, on ne démarre pas : mieux vaut planter que d'être vulnérable
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET manquant dans le fichier .env')
}

const app = express();

// Qui a le droit d'appeler l'API depuis un navigateur ?
// En local : Vite (port 5173). En ligne : l'adresse de ton site (variable FRONTEND_URL).
const origines = ['http://localhost:5173', process.env.FRONTEND_URL].filter(Boolean)
app.use(cors({ origin: origines }));
app.use(express.json());

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)

app.get('/api/test-protected', authMiddleware, function (req, res) {
  res.json({ message: 'API Shop en ligne' });
});

app.get('/', function (req, res) {
  res.json({ message: 'API DZShop en ligne' })
})

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URI)
  .then(function () {
    console.log('MongoDB connecté')
    app.listen(PORT, function () {
      console.log('Serveur sur le port ' + PORT);
    });
  })
  .catch(function (error) {
    console.log('Erreur MongoDB :', error)
  })