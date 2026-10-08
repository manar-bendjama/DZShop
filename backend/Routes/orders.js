import express from 'express'
import mongoose from 'mongoose'
import Order from '../Models/orderModel.js'
import Product from '../Models/productModel.js'
import authMiddleware from '../Middlware/authMiddleware.js'
import wilayas from '../data/wilayas.js'
import adminMiddleware from '../Middlware/adminMiddleware.js'

const router = express.Router()

const SEUIL_LIVRAISON_GRATUITE = 10000
const FRAIS_LIVRAISON = 500

// PASSER UNE COMMANDE → POST /api/orders (connecté)
router.post('/', authMiddleware, async function (req, res) {
  try {
    const { articles, client, telephone, wilaya, commune, adresse } = req.body

    if (!Array.isArray(articles) || articles.length === 0) {
      return res.status(400).json({ message: 'Le panier est vide' })
    }

    if (!telephone || !wilaya || !adresse) {
      return res.status(400).json({
        message: 'Téléphone, wilaya et adresse obligatoires'
      })
    }

    const valeurWilaya = String(wilaya).trim()

const wilayaChoisie = wilayas.find(function (w) {
  return (
    w.code === valeurWilaya ||
    `${w.code} - ${w.nom}` === valeurWilaya
  )
})

    if (!wilayaChoisie) {
      return res.status(400).json({
        message: 'Wilaya invalide'
      })
    }

    // Le navigateur envoie seulement { produit: _id, quantite }.
    // Le prix est récupéré depuis MongoDB.
    const ids = articles.map(function (a) {
      return String(a.produit)
    })

    if (!ids.every(mongoose.isValidObjectId)) {
      return res.status(400).json({
        message: 'Produit invalide'
      })
    }

    const produits = await Product.find({
      _id: { $in: ids }
    })

    let sousTotal = 0
    const lignes = []

    for (const article of articles) {
      const produit = produits.find(function (p) {
        return String(p._id) === String(article.produit)
      })

      const quantite = Number(article.quantite)

      if (!produit) {
        return res.status(400).json({
          message: 'Produit introuvable'
        })
      }

      if (!Number.isInteger(quantite) || quantite < 1 || quantite > 99) {
        return res.status(400).json({
          message: 'Quantité invalide pour ' + produit.nom
        })
      }

      if (quantite > produit.stock) {
        return res.status(400).json({
          message: 'Stock insuffisant pour ' + produit.nom
        })
      }

      sousTotal += produit.prix * quantite

      lignes.push({
        produit: produit._id,
        nom: produit.nom,
        prix: produit.prix,
        quantite: quantite
      })
    }

    const livraison =
      sousTotal >= SEUIL_LIVRAISON_GRATUITE
        ? 0
        : FRAIS_LIVRAISON

    const commande = await Order.create({
      user: req.user.id,
      client: client || 'Client',
      articles: lignes,
      sousTotal: sousTotal,
      livraison: livraison,
      total: sousTotal + livraison,
      telephone: telephone,
      wilaya: wilayaChoisie.nom,
      commune: commune,
      adresse: adresse
    })

    // On retire les articles vendus du stock
    for (const ligne of lignes) {
      await Product.updateOne(
        { _id: ligne.produit },
        { $inc: { stock: -ligne.quantite } }
      )
    }

    res.status(201).json(commande)

  } catch (err) {
    res.status(400).json({
      message: err.message
    })
  }
})

// MES COMMANDES → GET /api/orders/my (connecté)
router.get('/my', authMiddleware, async function (req, res) {
  try {
    const commandes = await Order.find({
      user: req.user.id
    }).sort({
      createdAt: -1
    })

    res.json(commandes)

  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
})

// TOUTES LES COMMANDES → GET /api/orders (admin)
router.get('/', authMiddleware, adminMiddleware, async function (req, res) {
  try {
    const commandes = await Order.find()
      .populate('user', 'nom email')
      .sort({ createdAt: -1 })

    res.json(commandes)

  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
})

// MODIFIER LE STATUT D'UNE COMMANDE → PUT /api/orders/:id/status (admin)
router.put('/:id/status', authMiddleware, adminMiddleware, async function (req, res) {
  try {
    const { statut } = req.body

    const statutsAutorises = [
      'En attente',
      'Confirmée',
      'Expédiée',
      'Livrée',
      'Annulée'
    ]

    if (!statutsAutorises.includes(statut)) {
      return res.status(400).json({
        message: 'Statut invalide'
      })
    }

    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(404).json({
        message: 'Commande introuvable'
      })
    }

    const commande = await Order.findById(req.params.id)

    if (!commande) {
      return res.status(404).json({
        message: 'Commande introuvable'
      })
    }

    commande.statut = statut

    await commande.save()

    res.json({
      message: 'Statut de la commande modifié avec succès',
      commande: commande
    })

  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
})

export default router