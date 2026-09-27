import mongoose from 'mongoose'

// Une ligne de commande = une "photo" du produit AU MOMENT de l'achat.
// Si le prix change demain, les anciennes commandes gardent l'ancien prix.
const ligneSchema = new mongoose.Schema(
  {
    produit: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    nom: { type: String, required: true },
    prix: { type: Number, required: true, min: 0 },
    quantite: { type: Number, required: true, min: 1 },
  },
  { _id: false }
)

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    client: { type: String, required: true },

    articles: {
      type: [ligneSchema],
      validate: function (lignes) {
        return lignes.length > 0
      },
    },

    sousTotal: { type: Number, required: true, min: 0 },
    livraison: { type: Number, required: true, min: 0 },
    total: { type: Number, required: true, min: 0 },

    telephone: { type: String, required: true, trim: true },
    wilaya: { type: String, required: true, trim: true },
    commune: { type: String, default: '', trim: true },
    adresse: { type: String, required: true, trim: true },

    statut: {
      type: String,
      enum: ['En attente', 'Expédiée', 'Livrée', 'Annulée'],
      default: 'En attente',
    },
  },
  { timestamps: true }
)

const Order = mongoose.model('Order', orderSchema)

export default Order