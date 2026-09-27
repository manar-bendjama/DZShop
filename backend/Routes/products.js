import express from 'express'
import mongoose from 'mongoose'
import Product from '../Models/productModel.js'
import authMiddleware from '../Middlware/authMiddleware.js'
import adminMiddleware from '../Middlware/adminMiddleware.js'

const router = express.Router()

// Les champs qu'on accepte du navigateur : on les choisit UN PAR UN.
// (jamais Product.create(req.body) : on ne fait pas confiance à ce qui arrive du réseau)
function champsAutorises(body) {
  return {
    nom: body.nom,
    description: body.description,
    prix: body.prix,
    categorie: body.categorie,
    stock: body.stock,
    image: body.image,
  }
}

// LIRE tous les produits  →  GET /api/products
router.get('/', async function (req, res) {
  try {
    const produits = await Product.find().sort({ createdAt: 1 })
    res.json(produits)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// LIRE un seul produit  →  GET /api/products/:id
router.get('/:id', async function (req, res) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ message: 'Produit introuvable' })
    }

    const produit = await Product.findById(req.params.id)
    if (!produit) {
      return res.status(404).json({ message: 'Produit introuvable' })
    }
    res.json(produit)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// CRÉER un produit  →  POST /api/products     (admin seulement)
router.post('/', authMiddleware, adminMiddleware, async function (req, res) {
  try {
    const produit = await Product.create(champsAutorises(req.body))
    res.status(201).json(produit)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// MODIFIER un produit  →  PUT /api/products/:id     (admin seulement)
router.put('/:id', authMiddleware, adminMiddleware, async function (req, res) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ message: 'Produit introuvable' })
    }

    const produit = await Product.findByIdAndUpdate(req.params.id, champsAutorises(req.body), {
      returnDocument: 'after',
      runValidators: true,
    })
    if (!produit) {
      return res.status(404).json({ message: 'Produit introuvable' })
    }
    res.json(produit)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// SUPPRIMER un produit  →  DELETE /api/products/:id     (admin seulement)
router.delete('/:id', authMiddleware, adminMiddleware, async function (req, res) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({ message: 'Produit introuvable' })
    }

    const produit = await Product.findByIdAndDelete(req.params.id)
    if (!produit) {
      return res.status(404).json({ message: 'Produit introuvable' })
    }
    res.json({ message: 'Produit supprimé' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router